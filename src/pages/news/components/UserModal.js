import {Component} from 'react';
import {Modal, Form, Input} from 'antd';
import PicturesWall from "./PicturesWall";
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const FormItem = Form.Item;

class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resp: '',
      editorHtml:null,
      editorText:null,
    }
  }
  // componentWillMount(){
  //   const E = require('wangeditor')
  //   const editor = new E('#editor')
  //   editor.create()
  // }
  componentDidMount() {
      const E = require('wangeditor');
      const editor = new E('#editor');
      editor.create()
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
  }
  showModelHandler = (e,url) => {
    if (e) e.stopPropagation();
    this.setState({
      resp: url,
    });
    this.props.toVisible({visible:true})
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
    this.props.toVisible({visible:false})
  };

  okHandler = () => {
    const {onOk} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values,this.state.resp);
        this.hideModelHandler();
      }
    });
  };

  handleUpload = ({payload}) => {
    this.setState({
      resp: payload
    })
  };

  render() {
    console.log(this.props.visible)
    const {children} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {name, description,url} = this.props.record;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return (
      <span>
        <span onClick={this.showModelHandler} >
          {children}
        </span>
        <Modal
          key = {this.props.visible+"edit"}
          width={800}
          title="编辑新闻"
          visible={this.props.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form  onSubmit={this.okHandler}>
            <FormItem
              label="Name"
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
              label="description"
            >
              {
                getFieldDecorator('description', {
                  initialValue: description,
                })(<Input/>)
              }
            </FormItem>
            <FormItem
              label="img"
            >
              <PicturesWall handleUpload={this.handleUpload.bind(this.state.resp)} url={url} />
            </FormItem>
            <FormItem
              label="edit"
            >
              <div id ="editor">
                <p>欢迎使用 wangEditor 富文本编辑器</p>
              </div>
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
