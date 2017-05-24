/*eslint-disable*/
import React from 'react'
import {CameraSVG} from './tCon/tCon';
import './sendimg.scss'
import { notify } from 'react-notify-toast';


/**
 * @param iStyle
 * 自定义样式，缺省时方形。
 * @param id
 * 设置id，如果你想的话，可以不填
 * @param changeAction
 * 图片改变后触发事件，接受一个参数改变后的图片file
 * @param defaultIMG
 * 未选择图片时候显示
 * @param userIMG
 * 选择后图片
 */
export default({defaultIMG, userIMG, changeAction, id, iStyle, disHint}) => {
  const createIMG = (img) => {
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

  const onChange = (event) => {
    let file = event.target.files[0];
    if (!file) {
      return false;
    }
    //检测文件类型
    if (file.type.indexOf('image') === -1) {
      notify.show("请选择图片文件！",'warning');
      return false;
    }
    //计算文件大小
    var size = Math.floor(file.size / 1024);
    if (size > 3000) {
      notify.show("上传文件不得超过3M",'warning');
      return false;
    };
    changeAction(file);
  }
  const inputStyle = {
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: '0',
    padding: '0 auto'
  }

  const style = {
    position: 'relative',
    float: 'left'
  }

  const spanStyle = {
    left: '50%',
    top: '50%',
    background: 'rgba(0,0,0,.8)',
    color: 'white',
    width: '90%',
    textAlign: 'center',
    borderRadius: '4px',
    transform: 'translateY(-50%) translateX(-50%)',
    position: 'absolute'
  }

  let move = null;
  let out = null;
  if(!disHint){
    move = (e) => {
      const element = e.currentTarget.childNodes[2];
      if (element.getAttribute('class') != 'show') {
        element.setAttribute('class', 'show');
      }
    }

    out = (e) => {
        e.currentTarget
        .childNodes[2]
        .setAttribute('class', 'hide');
    }  
  }

  let dimg = null;
  const text = defaultIMG.text;
  const bg = defaultIMG.background;
  iStyle.background = bg;
  if (!text) {
    dimg = defaultIMG;
  }

  

  const getAlt = (obj,bool)=>{
    if(!obj.text || bool)
      return <span />

    const altStyle = {
        left: '50%',
        top: '50%',
        color: obj.color,
        width: '100%',
        textAlign: 'center',
        transform: 'translateY(-50%) translateX(-50%)',
        position: 'absolute'
      }
    return (
      <span style={altStyle}>{obj.text}</span>
    )
  }

  if(iStyle.fontSize)
    spanStyle.fontSize = iStyle.fontSize;

  const imgStyle = {
    maxWidth: iStyle.width,
    maxHeight: iStyle.height,
    position: 'relative',
    top:"50%",
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
  } 


  return (
    <div
      className='iSendIMGView'
      onMouseMove={move}
      onMouseOut={out}
      style={style}
      id={id}>
      <div className="imgView" style={iStyle}>
        <img style={imgStyle} src={!userIMG
        ? dimg
        : createIMG(userIMG)}/>  
      </div>
      {getAlt(defaultIMG, userIMG)}
      <span className="hide" style={spanStyle}><CameraSVG className="iCamera"/>上传图片</span>
      <input style={inputStyle} type="file" name="myPhoto" onChange={onChange}/>
    </div>
  )
}