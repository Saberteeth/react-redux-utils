import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "./index.css";
import VCon from "../VCon/VCon";
const { Bold, Titleone, Titletwo, Italic, List, Inport, Code, Unline } = VCon;

const BLOCK_TYPES = [
  { label: "<>", style: "code-block" },
  { label: "1", style: "header-one" },
  { label: "2", style: "header-two" },
  { label: "’", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" }
];
const INLINE_STYLES = [
  { label: "B", style: "BOLD" },
  { label: "/", style: "ITALIC" },
  { label: "U", style: "UNDERLINE" }
];
function label(name){
  switch(name){
    case "1":
      return <Titleone />
    case "2":
      return <Titletwo />
    case "UL":
      return <List />
    case "B":
      return <Bold />
    case "/":
      return <Italic />
    case "’":
      return <Inport />
    case "<>":
      return <Code />;
    case "U":
      return <Unline />
    default:
      return <Bold />
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {label(this.props.label)}
      </span>
    );
  }
}
const RichTools = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-tools">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle[1]}
          style={type.style}
        />
      ))}
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle[0]}
          style={type.style}
        />
      ))}
    </div>
  );
};


class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    const { onChange } = this.props;
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => {
      const contentState = editorState.getCurrentContent();
      if (onChange) onChange(stateToHTML(contentState));

      return this.setState({ editorState });
    };
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  componentWillMount() {
    const { value } = this.props;
    this.updataValue(value);
  }

  updataValue(value){
    let initState = null;

    if (!value) {
      initState = EditorState.createEmpty();
    } else {
      const blocks4HTML = convertFromHTML(value);
      initState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          blocks4HTML.contentBlocks,
          blocks4HTML.entityMap
        )
      );
    }
    this.state = { editorState: initState };
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }
  getBlockStyle(block) {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return null;
    }
  }
  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <div className="RichEditor">
        <RichTools
          editorState={editorState}
          onToggle={[this.toggleBlockType, this.toggleInlineStyle]}
        />
        <div className={className + " flag"} onClick={this.focus}>
          <Editor
            blockStyleFn={this.getBlockStyle}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

export default RichEditor;
