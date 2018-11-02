import {Component} from 'react';
import {Modal, Form, Input} from 'antd';
import React from 'react';
// import { convertFromRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MyEditor from "./MyEditor";

const FormItem = Form.Item;
class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editor:this.props.record.editor
    }
  }
  // componentWillMount(){
  //   const E = require('wangeditor')
  //   const editor = new E('#editor')
  //   editor.create()
  // }
  // componentDidUpdate() {
  //
  //
  //     const E = require('wangeditor');
  //     const editor = new E('#editor');
  //     editor.create()
  //   // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
  // }
  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };


  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const {onOk} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values,this.state.editor);
        this.hideModelHandler();
      }
    });
  };

  handleUpload = ({payload}) => {
    sessionStorage.setItem("respNew",payload)
    this.setState({
      resp: payload
    })
  };
  editorContent({payload}){
    this.setState({
      editor:JSON.stringify(payload)
    })
  }

  render() {
    const {children} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {name, description,editor} = this.props.record;
    return (
      <span>
        <span onClick={this.showModelHandler} >
          {children}
        </span>
        <Modal
          width={820}
          title="编辑bug"
          visible={this.state.visible}
          onOk={this.okHandler.bind(this)}
          onCancel={this.hideModelHandler}
        >
          <Form  onSubmit={this.okHandler.bind(this)}>
            <FormItem
              label="bug标题"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input/>)
              }
            </FormItem>
            {/*<FormItem*/}
              {/*{...formItemLayout}*/}
              {/*label="url"*/}
            {/*>*/}
              {/*{*/}
                {/*getFieldDecorator('url', {*/}
                  {/*initialValue: url,*/}
                {/*})(<Input/>)*/}
              {/*}*/}
            {/*</FormItem>*/}
            <FormItem
              label="问题描述"
            >
              {
                getFieldDecorator('description', {
                  initialValue: description,
                })(<Input/>)
              }
            </FormItem>
            <FormItem
              label="bug截图"
            >
              <MyEditor editorContent = {this.editorContent.bind(this)} editor = {editor}/>
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
