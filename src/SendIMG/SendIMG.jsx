import React from 'react'
import VCons from '../VCon/VCon';
import './sendimg.css'

const {
  Add,
  Point,
  Firm,
  Rightarrow,
  Camera,
  Setting
} = VCons;
const INITMSG = "Choice Image";

function createIMG(img, defaultIMG) {
  if (!img) {
    return defaultIMG;
  }

  if (typeof img == 'string') {
    return img;
  }

  if (!img.name) {
    return defaultIMG;
  }

  if (window.URL) {
    return window
      .URL
      .createObjectURL(img);
  } else if (window.webkitURL) {
    return window
      .webkitURL
      .createObjectURL(img);
  } else {
    return defaultIMG;
  }
}

class SendIMGView extends React.Component {
  componentWillMount() {
    this.state = {
      img: null
    }
  }

  render() {
    const {
      style = {},
      className,
      id,
      defaultSrc = {
        msg : INITMSG,
        color : "white",
        bg : "lightgray"
      },
      msg = INITMSG,
      onChange = (file) => null
    } = this.props;

    const initStyle = {
      width: '200px',
      height: '200px'
    }

    const endStyle = Object.assign({}, initStyle, style);
    const inputStyle = {
      ...endStyle
    }

    const imgStyle = {
      maxWidth: endStyle.width,
      maxHeight: endStyle.height
    }

    const onchange = (event) => {
      let file = event.target.files[0];
      if (!file) {
        return false;
      }

      if (file.type.indexOf('image') === -1) {
        return false;
      }

      var size = Math.floor(file.size / 1024);
      if (size > 3000) {
        return false;
      };

      this.setState({img: file});
      onChange(file);
      return true;
    }

    let defaultIMG = defaultSrc;
    if (defaultSrc.msg) {
      defaultIMG = null;
      endStyle.background = defaultSrc.bg;
      endStyle.color = defaultSrc.color;
    }

    return (
      <div className={"t-sendimg " + className} id={id} style={endStyle}>
        <img
          className="t-img"
          src={createIMG(this.state.img, defaultIMG)}
          style={imgStyle}/>
        <div className="t-default">{defaultSrc.msg}</div>
        <div className="t-msg"><Camera/>{msg}</div>
        <input onChange={onchange} className="t-input" style={inputStyle} type="file"/>
      </div>
    )
  }
}

export default SendIMGView;