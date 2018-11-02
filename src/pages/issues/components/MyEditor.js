import React, { Component } from 'react';
// import { ContentState,EditorState,convertFromRaw ,convertFromHTML} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import config  from '../../../utils/config'
const { api } = config
const content1 = {"entityMap":{},"blocks":[{"key":"637gr","text":"他来自初始化","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class MyEditor extends Component {

  onContentStateChange = (contentState) => {
    console.log(contentState)
    this.props.editorContent({payload:contentState});
  };
  // componentDidMount(){
  //   editorContent();
  // }

  uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://${api.service_url}/babyship/uploadplus`);
        xhr.setRequestHeader('Authorization', 'Client-ID jiahangLee');
        const data = new FormData();
        data.append('file', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  render() {
    return (
      <Editor
        defaultContentState={(this.props.editor === undefined || this.props.editor === "") ? content1 : JSON.parse(this.props.editor)}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onContentStateChange={this.onContentStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
    )
  }
}

export default MyEditor
