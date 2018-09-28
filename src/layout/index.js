import React from 'react';
import router from 'umi/router';
import {connect} from 'dva'
import withRouter from 'umi/withRouter';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import Breakcrumbs from "../utils/Breakcrumbs";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class Layout1 extends React.Component {


  defaultRouter() {
    if (this.props.location.pathname === '/')
      return '3';
    else if (this.props.location.pathname === '/news')
      return '1';
    else if (this.props.location.pathname === '/teacher')
      return null;
    else
      return ''
  }

  handleClickTop = (e) => {
    if (e.key === "1") {
      router.push("/news")
    } else if (e.key === "2") {
      router.push("/teacher")
    }else if(e.key === "11"){
      router.push("/users")
    } else {
      router.push("/")
    }
  }

  handleClick = (e) => {
    if(e.key === "11") {
      router.push("/users")
    }else{
      router.push("/")
    }
  }
  logout=()=>{
    sessionStorage.clear()
    this.props.dispatch({type:"app/start"})
  }

  render() {
    if (this.props.history.location.pathname === "/login")
      return (
        <div>
          {this.props.children}
        </div>
      );
    return (

      <Layout>
        <Header className="header">
          <div className="logo" style={{
            width: "120px",
            height: "31px",
            background: "rgba(255,255,255,.2)",
            margin: "16px 28px 16px 0",
            float: "left",
            textAlign: "center",
            lineHeight: "31px",
            color: "#fff"
          }}>Logo
          </div>
          <Menu
            onClick={this.handleClickTop}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.defaultRouter()]}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="1">新闻资讯</Menu.Item>
            <Menu.Item key="2">教师团队</Menu.Item>
            <Menu.Item key="3">使用说明</Menu.Item>
            <SubMenu
              style={{
                float: 'right',
              }}
              title={<span>
              <Icon type="user" />
                {/*{user.username}*/}欢迎回来！{sessionStorage.getItem("cname")}
            </span>}
            >
              <Menu.Item key="logout" onClick={this.logout}>
                退出账户
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{background: '#fff'}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%', borderRight: 0}}
              onClick={this.handleClick}
            >
              <SubMenu key="sub1" title={<span><Icon type="user"/>用户管理</span>}>
                <Menu.Item key="11">用户设计</Menu.Item>
                <Menu.Item key="12">角色设计</Menu.Item>
                <Menu.Item key="13">修改密码</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop"/>拓展业务</span>}>
                <Menu.Item key="15">option1</Menu.Item>
                <Menu.Item key="16">option2</Menu.Item>
                <Menu.Item key="17">option3</Menu.Item>
                <Menu.Item key="18">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification"/>其他</span>}>
                <Menu.Item key="19">option5</Menu.Item>
                <Menu.Item key="110">option6</Menu.Item>
                <Menu.Item key="111">option7</Menu.Item>
                <Menu.Item key="112">option8</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breakcrumbs/>
            </Breadcrumb>
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>

    );
  }
}

export default withRouter(connect(({app}) => ({app}))(Layout1));
