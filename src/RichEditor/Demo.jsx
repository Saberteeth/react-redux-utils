import React from "react";
import RichEditor from "./index";

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }
  onClick(html) {
    console.log(html);
  }
  render() {
    return (
      <div>
        <RichEditor value={this.state.value}/>
      </div>
    );
  }
}
export default Main;