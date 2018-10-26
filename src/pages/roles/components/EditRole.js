import React from 'react'
import {Tree} from 'antd';

const TreeNode = Tree.TreeNode;

// const treeData = [{
//   title: '首页',
//   key: '0-0',
//   children: [{
//     title: '横栏',
//     key: '0-0-0',
//     children: [
//       {title: '新闻资讯', key: '0-0-0-0'},
//       {title: '教师团队', key: '0-0-0-1'},
//       {title: '使用说明', key: '0-0-0-2'},
//     ],
//   }, {
//     title: '侧栏',
//     key: '0-0-1',
//     children: [
//       {title: '用户设计', key: '0-0-1-0'},
//       {title: '角色设计', key: '0-0-1-1'},
//       {title: '修改密码', key: '0-0-1-2'},
//     ],
//   }, {
//     title: '拓展业务',
//     key: '0-0-2',
//   }],
// }, {
//   title: '其他',
//   key: '0-1',
//   children: [
//     {title: '0-1-0-0', key: '0-1-0-0'},
//     {title: '0-1-0-1', key: '0-1-0-1'},
//     {title: '0-1-0-2', key: '0-1-0-2'},
//   ],
// }];


class Demo extends React.Component {
  state = {
    expandedKeys: ['sub1', 'sub2'],
    autoExpandParent: true,
    checkedKeys: ['sub1'],
    selectedKeys: [],
    treeData:[]
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

  // componentWillMount() {
  //   let treeData2 = []
  //   let node = {}
  //   this.props.designRole.map(x => {
  //     console.log("生命周期" + JSON.stringify(x))
  //
  //     node.tittle = x.name
  //     node.key = x.keyId
  //     node.children = x.children.map(y=>{
  //       {tittle:y.name,}
  //     })
  //   })
  // }
  // componentWillMount() {
  //
  //   this.setState({
  //     treeData:this.props.designRole
  //   })
  // }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({checkedKeys});
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({selectedKeys});
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.childrenNode.length !== 0) {
        return (
          <TreeNode title={item.data.name} key={item.data.keyId} dataRef={item.data}>
            {this.renderTreeNodes(item.childrenNode)}
          </TreeNode>
        );
      }else{
      return(<TreeNode title={item.data.name} key={item.data.keyId} >
      </TreeNode>)}
    });
  }

  render() {
    console.log("我是editRole" + JSON.stringify(this.props.designRole))
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
        {this.renderTreeNodes(this.props.designRole)}
      </Tree>
    );
  }
}

export default Demo;
