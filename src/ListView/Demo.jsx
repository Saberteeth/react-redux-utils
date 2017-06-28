import React from "react";
import Rx from "rxjs";
import { ListView, iHandler } from "./index";
import "./demo.css";
const viewSubject = new Rx.Subject().delay(200);
viewSubject.subscribe({
  next: ({ height, demo }) => {
    if (viewSubject.height == height) {
      console.log("view change");
      demo.setState({ height: height });
      tools.updataView();
    }
  }
});

const items = [];
for (let i = 0; i < 5000; i += 1) {
  items[i] = i;
}

// function listCreate(handler) {
//   const li = [];
//   for (let i = 0; i < handler.getSize(); i += 1) {
//     const item = handler.getItem(i);
//     const itemView = handler.getView(item);
//     const view = (
//       <div
//         key={i}
//         className="item"
//         style={{
//           width: "100%",
//           height: item.height + "px"
//         }}
//       >
//         {itemView}
//       </div>
//     );
//     li.push(view);
//   }
//   return li;
// }

class Handler extends iHandler {
  getView(item) {
    let color = "white";
    let bg = "black";

    if (item.data % 2 == 1) color = "black";

    if (item.data % 2 == 1) bg = "white";

    return (
      <div
        className="item"
        style={{
          borderBottom: "1px solid black",
          background: color,
          width: "100%",
          height: "100%",
          color: bg
        }}
      >
        <img
          onClick={e => alert(item.data)}
          height={item.height}
          src="/images/24404591.jpeg"
        />
        {item.data}
      </div>
    );
  }
  getItem(index) {
    let h = 100;
    if (index != 0 && index % 3 == 0) {
      h = 120;
    }
    if (index != 0 && index % 5 == 0) {
      h = 160;
    }
    return { height: h, data: items[index] };
  }
  getSize() {
    return items.length;
  }
}
let height = 600;
const handler = new Handler();
const tools = {
  onScroll: null,
  updataView: null
};
export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    window.onresize = e => {
      this.changeHeight();
    };
    this.state = {
      height: 200
    };
    this.changeHeight();
  }
  changeHeight() {
    let h = window.innerHeight - 200;
    h = h < 200 ? 200 : h;
    viewSubject.height = h;
    viewSubject.next({ height: h, demo: this });
  }
  render() {
    return (
      <div>
        <div style={{ float: "left" }}>
          <ListView
            isShowScroll={true}
            tools={tools}
            width={300}
            height={this.state.height}
            handler={handler}
          />
        </div>
        <div style={{ float: "left", marginLeft: "10px" }}>
          <div>U can change the browser's height to look at the result</div>
        </div>
        {/*<div style={{height:'550px',width:"300px",overflow:'auto'}}>
          {listCreate(handler)}
        </div>*/}
      </div>
    );
  }
}
