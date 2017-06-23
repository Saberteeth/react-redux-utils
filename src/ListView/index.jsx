import React from "react";
import "./index.css";

export class iHandler {
  getView(item) {
    return null;
  }
  getItem(index) {
    return null;
  }
  getSize() {
    return 0;
  }
}

export class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.updown = 0;
    this.maxHeight = 0;
    this.isEnd = false;
    this.lastList = null;
    this.endOFF = 0;
    this.endSize = 0;
    this.state = {
      handler: props.handler,
      scrollY: 0,
      begin: 0
    };
    this.verify();
  }

  verify() {
    this.endSize = 0;
    let h = 0;
    let off = 0;
    for (
      let i = this.handler.getSize() - 1;
      i >= 0;
      i -= 1
    ) {
      h += this.handler.getItem(i).height;
      off = this.height - h;
      this.endSize += 1
      if (off <= 0) {
        break;
      }
    }

    this.endOFF = off > 0 ? 0 : off;
  }

  get handler() {
    return this.state.handler;
  }

  set handler(handler) {
    this.setState(Object.assign({}, this.state, { handler: handler }));
  }

  get width() {
    return this.props.width;
  }

  get height() {
    return this.props.height;
  }

  _createView() {
    let list = [];
    let nowTop = 0;

    let begin = this.state.begin;
    this.isEnd = false;
    let b = false;

    for (let i = this.state.begin; i < this.handler.getSize(); i += 1) {
      const item = this.handler.getItem(i);
      if (this.state.scrollY + item.height <= 0) {
        this.state.scrollY = 0;
        this.state.begin = i + 1;
        continue;
      }

      if (this.state.scrollY > 0) {
        if (i == 0) {
          this.state.scrollY = 0;
        } else {
          this.state.begin = i - 1;
          this.state.scrollY =
            this.state.scrollY - this.handler.getItem(this.state.begin).height;
          break;
        }
      }

      if (this.state.scrollY + nowTop >= this.height) {
        break;
      }

      nowTop += item.height;
      if(this.updown > 0)
      if (i == this.handler.getSize() - 1) {
        if (nowTop + this.state.scrollY - this.height < item.height/10) {
          this.state.begin = this.handler.getSize() - this.endSize;
          this.isEnd = true;
        }
      }

      if(!b){
        this.maxHeight = item.height;
      }

      b = true;
      list.push(item);
    }

    if (list.length > 0) {
      this.lastList = list;
    } else {
      list = [this.handler.getItem(this.state.begin), ...this.lastList];
    }

    const result = [];
    list.map((item, index) => {
      const itemView = this.handler.getView(item);

      const view = (
        <div
          key={index}
          className="item"
          style={{
            top: this.state.scrollY,
            width: "100%",
            height: item.height + "px"
          }}
        >
          {itemView}
        </div>
      );
      result.push(view);
    });
    return result;
  }

  render() {
    const wheel = e => {
      e.stopPropagation();
      e.preventDefault();
      this.updown = e.deltaY;
      let offY = this.state.scrollY - e.deltaY;
      if(this.maxHeight != 0){
        offY = offY > this.maxHeight? offY%this.maxHeight:offY;
      }
      
    
      if (this.isEnd) {
        offY = offY < this.endOFF ? this.endOFF : offY;
      }
      this.setState(Object.assign({}, this.state, { scrollY: offY }));
    };

    return (
      <div
        onWheel={wheel}
        className="list-view"
        style={{
          width: this.width + "px",
          height: this.height + "px"
        }}
      >
        {this._createView()}
      </div>
    );
  }
}
