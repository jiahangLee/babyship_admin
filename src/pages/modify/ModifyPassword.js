import React from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {connect} from "dva/index";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.username = localStorage.getItem("username")
        this.props.dispatch({
          type: 'users/patch2',
          payload: {values}
        });
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };



    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
            <Input disabled={true} value={localStorage.getItem("username")}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="旧密码"
        >
          {getFieldDecorator('oldPassword', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="old_password" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="新密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>


        {/*<FormItem*/}
          {/*{...formItemLayout}*/}
          {/*label="手机号码"*/}
        {/*>*/}
          {/*{getFieldDecorator('phone', {*/}
            {/*rules: [{ required: true, message: 'Please input your phone number!' }],*/}
          {/*})(*/}
            {/*<Input addonBefore={prefixSelector} style={{ width: '100%' }} />*/}
          {/*)}*/}
        {/*</FormItem>*/}


        {/*<FormItem {...tailFormItemLayout}>*/}
          {/*{getFieldDecorator('agreement', {*/}
            {/*valuePropName: 'checked',*/}
          {/*})(*/}
            {/*<Checkbox>I have read the <a href="">agreement</a></Checkbox>*/}
          {/*)}*/}
        {/*</FormItem>*/}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">修改密码</Button>
        </FormItem>
      </Form>
    );
  }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default connect(({users}) => ({users}))(WrappedRegistrationForm)
