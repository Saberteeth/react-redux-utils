import React from "react";
import RichEditor from "./index";
import "./demo.css"
import toMarkdown from "to-markdown";

const database =
  '<h1>Readme</h1><p>This is a demo about <strong>RichEditor</strong>. U can try everything.<em>There have some feature about it:</em></p><ul><li>Ugly</li><li>Bad icons</li><li>A little Utils</li></ul><p><em><strong>Package:</strong></em></p><ol><li><em>React</em></li><li><em>draft-js</em></li><li><em>draft-js-export-html</em></li></ol><p><em><strong>This is code:</strong></em></p><pre><code><em>import React from "react";</em><br><em>import RichEditor from "./index";</em><br><em>const value = "..."</em><br><em>const onChange = html =&gt; console.log(html);</em><br><em>export default () =&gt; &lt;RichEditor value={value} onChange={onChange} /&gt;</em></code></pre><blockquote><em>https://draftjs.org/</em></blockquote><blockquote><em>http://www.react.org/</em></blockquote><blockquote><em>https://www.npmjs.com/package/draft-js-export-html</em></blockquote>';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: database,
      html:"Waiting change..."
    };
  }
  /**
   * @param {output} html 
   */
  onChange(html) {
    //console.log(toMarkdown(html));
    this.setState(Object.assign({},this.state,{html:html}))
  }
  render() {
    return (
      <div>
        <RichEditor onChange={this.onChange.bind(this)} value={this.state.value} />
        <div>
          <div id="show" dangerouslySetInnerHTML={{__html: this.state.html}} />
        </div>
      </div>
    );
  }
}
export default Main;
