import { Component } from 'react';
import { Modal, Form, Input ,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

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
  handleChange =(value)=> {
    console.log(`selected ${value}`);
  }
  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name,cnName,description } = this.props.record;
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
          <Form horizontal="true" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="登录名"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                  rules: [
                    { required: true, message: '输入用户名' },
                  ],
                })(<Input placeholder="输入用户名"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="真实姓名"
            >
              {
                getFieldDecorator('cnName', {
                  initialValue: cnName,
                  rules: [
                    { required: true, message: '输入姓名' },
                  ],
                })(<Input placeholder="输入姓名"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色"
              hasFeedback
            >
              {/*{*/}
                {/*getFieldDecorator('role1', {*/}
                  {/*initialValue: role1,*/}
                {/*})(<Input  disabled={true}/>)*/}
              {/*}*/}
              {/*{console.log("aaaaaaaaaaaaaaaa"+JSON.stringify(this.props.roles[0]))}*/}

              {getFieldDecorator('select', {
                rules: [
                  { required: true, message: '选择角色' },
                ],
                // initialValue: this.props.roles[0].name
              })(
                <Select  onChange={this.handleChange} placeholder="选择角色">
                {this.props.roles.map(x=>{
                  return(
                    <Option key={x.id} value={x.id}>{x.name}</Option>
                  )
                })}
                </Select>
              )}
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
        </Modal>
      </span>
    );
  }
}
export default Form.create()(UserEditModal);
