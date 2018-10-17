import { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import EditRole from "./EditRole";

const FormItem = Form.Item;

class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name,description } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="编辑用户"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal={true} onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="角色名称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="概述"
            >
              {
                getFieldDecorator('description', {
                  initialValue: description,
                })(<Input />)
              }
            </FormItem>

          </Form>
          <div>
            <EditRole style={{width:200,margin_left:"100px"}}/>

          </div>

        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
