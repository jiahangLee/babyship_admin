import {Component} from 'react';
import {Modal, Form, Input} from 'antd';
import PicturesWall from "./PicturesWall";

const FormItem = Form.Item;

class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      resp: ''
    }
  }

  showModelHandler = (e,url) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
      resp: url
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const {onOk} = this.props;
    let url = this.state.resp;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(url === undefined)
          url = sessionStorage.getItem("resp")
        onOk(values,url);
        this.hideModelHandler();
      }
    });
  };

  handleUpload = ({payload}) => {
    sessionStorage.setItem("resp",payload)
    this.setState({
      resp: payload
    })
  };

  render() {
    const {children} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {name,major, description,url} = this.props.record;
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
          title="编辑资料"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form  onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="主修"
            >
              {
                getFieldDecorator('major', {
                  initialValue: major,
                })(<Input />)
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
              {...formItemLayout}
              label="简述"
            >
              {
                getFieldDecorator('description', {
                  initialValue: description,
                })(<Input/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="头像"
            >
              <PicturesWall handleUpload={this.handleUpload.bind(this.state.resp)} url={url} />
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
