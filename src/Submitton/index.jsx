import React from 'react';

export default class Submitton extends React.Component {
  componentWillMount() {
    this.state = this.initState();
  }

  initState() {
    return {type: 0}
  }

  changeType(type) {
    this.setState(Object.assign({}, this.state, {type: type}));
  }

  render() {
    const {
      err,
      children = "Submit",
      id,
      className,
      style,
      executor,
      disName = "Sending..",
      errName = "Error",
      abledTye = ["", "disabled", ""]
    } = this.props;
    const text = [children, disName, errName];
    const click = async function (e) {
      if(!executor){
        return;
      }
      try{
        const promise = new Promise(executor);
        this.changeType(1);
        const result = await promise;
        this.changeType(0);
      } catch(event) {
        this.changeType(2);
        if(err){
          err();
        }
      }
    }.bind(this);

    return (
      <button
        disabled={abledTye[this.state.type]}
        onClick={click}
        id={id}
        className={className}
        style={style}>{text[this.state.type]}</button>
    )
  }
}