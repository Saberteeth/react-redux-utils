import React from "react";
import { Map } from "react-amap";
import Rx from "rxjs";
import "./index.css";

function setState(target, value) {
  target.setState(Object.assign({}, target.state, value));
}

const MAPKEY = "778d29b7dab4ef529442a6c70cf4afa7";
const mapLoader = new Rx.Subject().delay(200);
mapLoader.subscribe({
  next: ({ value, success }) => {
    if (value) {
      success(value);
    } else {
      mapLoader.next({
        value: window.AMap,
        success: success
      });
    }
  }
});
const searchCtrl = new Rx.Subject().delay(500);
searchCtrl.subscribe({
  next: ({ value, ctrl }) => {
    if (value == ctrl.state.where) {
      ctrl.autocomplete.search(value, (status, result) => {
        if (status === "complete") {
          setState(ctrl, { tips: result.tips });
        } else {
          setState(ctrl, { tips: [] });
        }
      });
    }
  }
});

export function SearchBar({ ctrl, __map__ }) {
  const onChange = e => {
    setState(ctrl, { where: e.target.value });
    searchCtrl.next({ value: e.target.value, ctrl: ctrl });
  };

  const createList = () => {
    const tips = ctrl.state.tips;
    if (tips.length == 0) return null;
    const items = [];
    const click = index => {
      ctrl.search(index);
    };

    for (let i = 0; i < tips.length; i += 1) {
      const item = (
        <li
          className="search-map-item"
          tabIndex="-1"
          onClick={e => {
            click(i);
          }}
          key={i}
        >
          {tips[i].name + " " + tips[i].district}
        </li>
      );
      items.push(item);
    }

    return (
      <ul className="search-map-list">
        {items}
      </ul>
    );
  };
  return (
    <div className="search-map">
      <div>
        <input
          disabled={!ctrl._autocomplete || ctrl.state.loading ? "disabled" : ""}
          value={ctrl.state.where}
          onChange={onChange}
        />
      </div>
      {createList()}
    </div>
  );
}

function Loading({ bool }) {
  return (
    <div className="loading" style={{ display: bool ? "" : "none" }}>
      <b>Loading..</b>
    </div>
  );
}

function Init({ ctrl, __map__ }) {
  if (!ctrl.map) ctrl.map = __map__;
  return null;
}

function LineBar({ctrl}){
  const last = e => {
    let num = ctrl._lineWho - 1;
    num = num < 0 ? 0:num;
    ctrl._lineWho = num;

    const start = ctrl._line[ctrl._lineWho];
    const end = ctrl._line[ctrl._lineWho + 1];
    ctrl.searchLine([start,end]);
  }
  const next = e => {
    let num = ctrl._lineWho + 1;
    num = num >= ctrl._line.length - 2 ? ctrl._line.length - 2:num;
    ctrl._lineWho = num;

    const start = ctrl._line[ctrl._lineWho];
    const end = ctrl._line[ctrl._lineWho + 1];
    ctrl.searchLine([start,end]);
  }
  return (
    <div className="xmap-line">
      <button disabled={ctrl._lineWho == 0?"disable":""} onClick={last}>上一段</button>
      <button disabled={ctrl._lineWho == ctrl._line.length - 2?"disable":""} onClick={next}>下一段</button>
    </div>
  )
}

class XMap extends React.Component {
  constructor(props) {
    super(props);
    this._line = null;
    this._lineWho = 0;
    this._autocomplete = null;
    this._search = null;
    window.XMap = { onMarkClick: props.onMarkClick };
    window.XMap._markClick = e => {
      if (typeof window.XMap.onMarkClick == "function") {
        window.XMap.onMarkClick(window.XMap.markEvent);
      }
    };
    this.state = {
      where: "",
      tips: [],
      loading: false
    };

    if (this.props.utils) {
      for (name in this.props.utils) {
        this.props.utils[name] = this[name].bind(this);
      }
    }
  }

  get autocomplete() {
    return this._autocomplete;
  }

  componentDidMount() {
    const obj = {
      value: window.AMap,
      success: AMap => {
        if (!AMap.plugin) {
          setTimeout(function() {
            obj.success(window.AMap);
          }, 200);
          return;
        }

        AMap.plugin(
          [
            "AMap.Autocomplete",
            "AMap.PlaceSearch",
            "AMap.CitySearch",
            "AMap.Driving"
          ],
          e => {
            const autoOptions = {
              city: "", //城市，默认全国
              input: "road_book_map_search_input" //使用联想输入的input的id
            };
            this._autocomplete = new window.AMap.Autocomplete(autoOptions);
            const thas = this;
            let where = new window.AMap.CitySearch();
            where.getLocalCity((status, result) => {
              if (status == "complete") {
                let place = "";
                if (result.city) {
                  place = result.city;
                } else {
                  place = result.province;
                }
                setState(thas, { where: place });
              }
            });
          }
        );
      }
    };
    mapLoader.next(obj);
  }

  search(index) {
    this.map.clearMap();
    const tip = this.state.tips[index];
    const placeSearch = new window.AMap.PlaceSearch({
      city: tip.adcode,
      map: this.map
    });
    window.AMap.event.addListener(placeSearch, "markerClick", e => {
      window.XMap.markEvent = e;
      setTimeout(() => {
        const father = document.getElementsByClassName("amap-content-body")[0];
        father.innerHTML =
          "<div class='xmap-mark'><div>" +
          e.data.name +
          "</div><button onclick='window.XMap._markClick(event)'>+</button></div>";
      }, 0);
    });
    placeSearch.search(tip.name, status => {
      setState(this, { loading: false });
    });
    setState(this, {
      where: this.state.tips[index].name,
      tips: [],
      loading: true
    });
  }

  kedown(e) {
    const docs = document.getElementsByClassName("search-map-item");
    if (!docs || docs.length == 0) return;
    const focus = document.activeElement;
    switch (e.keyCode) {
      case 40:
        let activeNow = null;
        for (let i = 0; i < docs.length; i += 1) {
          if (docs[i].contains(focus)) {
            let now = i + 1;
            now = now >= docs.length ? 0 : now;
            docs[now].focus();
            return;
          }
        }
        break;
      case 38:
        for (let i = docs.length - 1; i >= 0; i -= 1) {
          if (docs[i].contains(focus)) {
            let now = i - 1;
            now = now < 0 ? docs.length - 1 : now;
            docs[now].focus();
            return;
          }
        }
        break;
      case 13:
        for (let i = 0; i < docs.length; i += 1) {
          if (docs[i].contains(focus)) {
            this.search(i);
            return;
          }
        }
        break;
      default:
        return;
    }
    docs[0].focus();
  }

  searchLine(line) {
    this.map.clearMap();
    if (line.length < 2 || this.state.loading) return;
    setState(this, { loading: true });
    const drive = new window.AMap.Driving({ map: this.map });
    drive.search(line[0], line[1], e => {
      setState(this, { loading: false });
    });
  }

  line(line){
    if(line.length < 2) return;

    this._line = line;
    this._lineWho = 0;
    this.searchLine([line[0],line[1]]);
  }

  render() {
    const { style = "", xtools = [] } = this.props;
    return (
      <div className="xmap" style={style} onKeyDown={this.kedown.bind(this)}>
        <Map amapkey={MAPKEY}>
          <Init ctrl={this} />
          {this._line?<LineBar ctrl={this}/>:null}
        </Map>
        {xtools.map((View, index) => {
          return <View key={index} ctrl={this} />;
        })}
        <Loading bool={this.state.loading} />
        
      </div>
    );
  }
}

export default XMap;
