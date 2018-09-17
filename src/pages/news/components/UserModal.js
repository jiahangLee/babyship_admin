import {Component} from 'react';
import {Modal, Form, Input} from 'antd';
import PicturesWall from "./PicturesWall";
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
      resp: '',
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
  showModelHandler = (e,url) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
      resp: url,
    });
  };


  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const {onOk} = this.props;
    let url = this.state.resp
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.resp === undefined)
          url = localStorage.getItem("respNew")
        onOk(values,url,this.state.editor);
        this.hideModelHandler();
      }
    });
  };

  handleUpload = ({payload}) => {
    localStorage.setItem("respNew",payload)
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
    const {name, description,url,editor} = this.props.record;

    return (
      <span>
        <span onClick={this.showModelHandler} >
          {children}
        </span>
        <Modal
          width={820}
          title="编辑新闻"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form  onSubmit={this.okHandler}>
            <FormItem
              label="新闻标题"
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
              label="概述"
            >
              {
                getFieldDecorator('description', {
                  initialValue: description,
                })(<Input/>)
              }
            </FormItem>
            <FormItem
              label="预览图"
            >
              <PicturesWall handleUpload={this.handleUpload.bind(this.state.resp)} url={url} />
            </FormItem>
            <FormItem
              label="内容"
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
