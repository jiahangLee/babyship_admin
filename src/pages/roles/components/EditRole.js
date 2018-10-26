import React from 'react'
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

const treeData = [{
  title: '首页',
  key: '0-0',
  children: [{
    title: '横栏',
    key: '0-0-0',
    children: [
      { title: '新闻资讯', key: '0-0-0-0' },
      { title: '教师团队', key: '0-0-0-1' },
      { title: '使用说明', key: '0-0-0-2' },
    ],
  }, {
    title: '侧栏',
    key: '0-0-1',
    children: [
      { title: '用户设计', key: '0-0-1-0' },
      { title: '角色设计', key: '0-0-1-1' },
      { title: '修改密码', key: '0-0-1-2' },
    ],
  }, {
    title: '拓展业务',
    key: '0-0-2',
  }],
}, {
  title: '其他',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
  ],
}];


// const treeData2 =
//   this.props.designRole.map(x=>{
//     console.log(JSON.stringify(x))
//   })

class Demo extends React.Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  render() {
    console.log("我是editRole"+JSON.stringify(this.props.designRole))
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}

export default Demo;
