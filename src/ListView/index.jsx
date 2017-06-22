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
    this.begin = 0;
    this.end = 0;
    this.state = {
      handler: props.handler,
      scrollY: 0,
      begin:0,
      end:0
    };
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
    const list = [];
    let begin = 0;
    let end = 0;
    let nowTop = 0;
    for (let i = 0; i < this.handler.getSize(); i += 1) {
      const item = this.handler.getItem(i);
      nowTop += item.height;
      const offY = this.state.scrollY + nowTop;

      if (offY > 0 && offY <= item.height) begin = i;
      if (i == 0) if (offY >= item.height) begin = -1;

      const y = offY - this.height;
      if (y >= 0 && y < item.height) end = i;
      if (i == this.handler.getSize() - 1) if (offY <= this.height) end = -1;

      const itemView = this.handler.getView(item);
      const view = (
        <div
          key={i}
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
      list.push(view);
    }
    
    this.begin = begin;
    this.end = end;
    return list;
  }

  render() {
    const wheel = e => {
      e.stopPropagation();
      let offY = this.state.scrollY - e.deltaY;
      if(e.deltaY < 0 && this.begin == -1){
        return;
      }

      if(e.deltaY > 0 && this.end == -1){
        return;
      }
      this.setState(Object.assign({}, this.state, { scrollY: offY }));
    };

    return (
      
      <div
        onWheel={wheel}
        className="list-view"
        style={{
          width: this.width + "px",
          height: this.height + "px",
          border: "1px solid black"
        }}
      >
        {this._createView()}
      </div>
    );
  }
}
