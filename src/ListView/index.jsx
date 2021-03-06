import React from "react";
import "./index.css";
import PropTypes from "prop-types";
const UNIT = "px";
/**
 * This is an abstract class, U must realize it's function;
 * @abstract @function  getView => JSX.Element
 * @abstract @function getItem => {height:number,data:object}
 * @abstract @function getSize => number
 */
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

function getY(element) {
  let parObj = element;
  let top = element.offsetTop;
  while ((parObj = parObj.offsetParent)) {
    top += parObj.offsetTop;
  }
  return top;
}

function pointerY(event) {
  return (
    event.pageY ||
    event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop)
  );
}

/**
 * This is ListView, must have attribute height and handler.
 * @prop height:number
 * @prop width:number
 * @prop handler:iHandler
 */
export class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.oldTouchY = 0;
    this.updown = 0;
    this.maxHeight = 0;
    this.isEnd = false;
    this.lastList = null;
    this.endOFF = 0;
    this.endSize = 0;
    this.scrollOffY = 0;
    this.isHideScroll = !props.isShowScroll;
    this.state = {
      handler: props.handler,
      scrollY: 0,
      begin: 0,
      scrollHeight: 30,
      scrollTop: 0
    };
    this.updataView();
    if (this.props.tools) {
      for (name in this.props.tools) {
        this.props.tools[name] = this[name].bind(this);
      }
    }
  }

  updataView() {
    const thas = this;
    setTimeout(() => {
      thas.endSize = 0;
      let h = 0;
      let off = 0;
      for (let i = thas.handler.getSize() - 1; i >= 0; i -= 1) {
        h += thas.handler.getItem(i).height;
        off = thas.height - h;
        thas.endSize += 1;
        if (off <= 0) {
          break;
        }
      }
      thas.endOFF = off > 0 ? 0 : off;

      let scrollHeight = Math.floor(
        this.height * (this.endSize / this.handler.getSize())
      );

      scrollHeight = scrollHeight < 30 ? 30 : scrollHeight;

      thas.onScroll(0);
      thas.setState(
        Object.assign({}, this.state, { scrollHeight: scrollHeight })
      );
    }, 0);
  }

  get handler() {
    return this.state.handler;
  }

  set handler(handler) {
    this.setState(Object.assign({}, this.state, { handler: handler }));
  }

  get offEndIndex() {
    return (
      this.endOFF /
      this.handler.getItem(this.handler.getSize() - this.endSize).height
    );
  }

  onScroll(percent, iScrollChange) {
    if (percent < 0 || percent > 1) return;
    if (!iScrollChange) {
      let maxTop = this.height - this.state.scrollHeight;
      this.state.scrollTop = percent * maxTop;
    }
    const max = this.handler.getSize() - this.endSize;
    const realNow = percent * (max - this.offEndIndex);
    let now = Math.floor(realNow);
    this.state.scrollY = -(realNow - now) * this.handler.getItem(now).height;
    this.state.begin = now;
    this.setState(Object.assign({}, this.state));
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

      if (i == this.state.begin)
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
      if (this.updown > 0)
        if (i == this.handler.getSize() - 1) {
          if (nowTop + this.state.scrollY - this.height < item.height / 10) {
            this.state.begin = this.handler.getSize() - this.endSize;
            this.isEnd = true;
          }
        }

      if (!b) {
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
      if (!itemView) {
        throw new Error("U handler doesn't have function getView");
      }
      const view = (
        <div
          key={index}
          className="list-view-item"
          style={{
            top: this.state.scrollY,
            width: "100%",
            height: item.height + UNIT
          }}
        >
          {itemView}
        </div>
      );
      result.push(view);
    });

    return result;
  }

  _scroll(y) {
    this.updown = y;
    let offY = this.state.scrollY - y;
    if (this.maxHeight != 0) {
      offY = offY > this.maxHeight ? offY % this.maxHeight : offY;
    }

    if (this.isEnd) {
      offY = offY < this.endOFF ? this.endOFF : offY;
    }

    if (!this.isHideScroll) {
      let maxTop = this.height - this.state.scrollHeight;
      const scale =
        1 / (this.handler.getSize() - this.endSize - this.offEndIndex);
      this.state.scrollTop =
        (this.state.begin - this.state.scrollY / this.maxHeight) *
        scale *
        maxTop;
    }
    this.setState(Object.assign({}, this.state, { scrollY: offY }));
  }

  _wheel(e) {
    e.stopPropagation();
    e.preventDefault();
    this._scroll(e.deltaY);
  }

  _touchStart(e) {
    if (!e.touches[0]) return;
    e.stopPropagation();
    e.preventDefault();
    this.oldTouchY = pointerY(e.touches[0]);
  }

  _touchMove(e) {
    if (!e.touches[0]) return;
    e.stopPropagation();
    e.preventDefault();
    let newY = pointerY(e.touches[0]);
    this._scroll(this.oldTouchY - newY);
    this.oldTouchY = newY;
  }

  _mouseDownScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    this.scrollOffY = pointerY(e) - this.state.scrollTop;
    window.onmouseup = e => {
      window.onmousemove = null;
      window.onmouseup = null;
    };
    window.onmousemove = e => {
      e.preventDefault();
      e.stopPropagation();
      let top = pointerY(e) - this.scrollOffY;
      top = top < 0 ? 0 : top;
      let maxTop = this.height - this.state.scrollHeight;
      top = top > maxTop ? maxTop : top;
      this.state.scrollTop = top;
      this.onScroll(top / maxTop, !this.isHideScroll);
    };
  }

  _mouseDownScrollView(e) {
    e.stopPropagation();
    e.preventDefault();
    const offY = pointerY(e) - getY(e.target);
    this.onScroll(offY / this.height);
  }

  _touchStartScrollView(e) {
    e.stopPropagation();
    e.preventDefault();
    const offY = pointerY(e.touches[0]) - getY(e.target);
    this.onScroll(offY / this.height);
  }

  render() {
    return (
      <div>
        {this.isHideScroll
          ? null
          : <div
              onTouchStart={this._touchStartScrollView.bind(this)}
              onMouseDown={this._mouseDownScrollView.bind(this)}
              className="list-view-scroll"
              style={{ height: this.height }}
            >
              {this.state.scrollHeight != this.height
                ? <div
                    onMouseDown={this._mouseDownScroll.bind(this)}
                    className="list-view-scroll-btn"
                    style={{
                      height: this.state.scrollHeight,
                      top: this.state.scrollTop + "px"
                    }}
                  />
                : null}
            </div>}
        <div
          onTouchStart={this._touchStart.bind(this)}
          onTouchMove={this._touchMove.bind(this)}
          onWheel={this._wheel.bind(this)}
          className="list-view"
          style={{
            width: this.width ? this.width + UNIT : "100%",
            height: this.height + UNIT
          }}
        >
          {this._createView()}
        </div>
      </div>
    );
  }
}
ListView.propTypes = {
  height: PropTypes.number.isRequired,
  handler: PropTypes.object.isRequired
};
