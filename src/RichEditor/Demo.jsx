import React from "react";
import RichEditor from "./index";
const html =
  '<h1>Readme</h1><p>This is a demo about <strong>RichEditor</strong>. U can try everything.<em>There have some feature about it:</em></p><ul><li>Ugly</li><li>Bad icons</li><li>A little Utils</li></ul><p><em>Package:</em></p><ol><li><em>React</em></li><li><em>draft-js</em></li><li><em>draft-js-export-html</em></li></ol><p><em>This is code:</em></p><pre><code><em>import React from "react";</em><br><em>import RichEditor from "./index";</em><br><em>const value = "..."</em><br><em>const onChange = html =&gt; console.log(html);</em><br><em>export default () =&gt; &lt;RichEditor value={value} onChange={onChange} /&gt;</em></code></pre><blockquote><em>https://draftjs.org/</em></blockquote><blockquote><em>http://www.react.org/</em></blockquote><blockquote><em>https://www.npmjs.com/package/draft-js-export-html</em></blockquote>';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: html
    };
  }
  /**
   * @param {output} html 
   */
  onChange(html) {}
  render() {
    return (
      <div>
        <RichEditor onChange={this.onChange} value={this.state.value} />
      </div>
    );
  }
}
export default Main;
