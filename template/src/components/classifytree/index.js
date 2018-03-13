import { Tree, TreeSelect } from 'antd'
import React, { Component } from 'react'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const TreeNode = Tree.TreeNode

class Classifytree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: [],
      checkedKeys: [],
      expandedKeys: ['all'],
      isFirst: true,
      isInit: true,
      treeSelectValue: []
    }
    const methods = ['loop', 'onExpand', 'onCheck', 'differFrontAndBack']
    methods.map((i) => {
      this[i] = this[i].bind(this)
    })
  }
  componentWillReceiveProps(props) {
    if (!props.checkable) {
      return
    }
    if (props.isEdit) {
      if (this.state.isFirst) {
        this.setState({
          checkedKeys: props.defaultNode || [],
          expandedKeys: props.defaultNode || ['all'],
          isFirst: false
        })
      } else {
        this.setState({
          checkedKeys: props.checkedNode || [],
          expandedKeys: props.checkedNode || ['all'],
          isFirst: false
        })
      }
    } else {
      this.setState({
        checkedKeys: props.defaultNode || [],
        expandedKeys: props.defaultNode || ['all'],
        isFirst: true
      })
    }
    let a = this.differFrontAndBack(props.defaultNode, this.props.defaultNode)
    if (a) {
      this.setState({
        isInit: true
      })
    } else {
      // 解决antd中,disableCheckbox初始化为true时，切换状态后无法全选的问题
      setTimeout(() => {
        this.setState({
          isInit: false
        })
      }, 1000)
    }
  }
  differFrontAndBack(newData, oldData) {
    let newNode = new Set(newData)
    let oldNode = new Set(oldData)
    let differFront = new Set([...newNode].filter(v => !oldNode.has(v)))
    let differBack = new Set([...oldNode].filter(v => !newNode.has(v)))
    if (Array.from(differFront).length > 0 || Array.from(differBack).length > 0) {
      return true
    } else {
      return false
    }
  }
  render() {
    const treeData = this.props.treeData
    const treeNode = this.loop(treeData)
    if (!treeData) {
      return (
        <div>暂无数据</div>
      )
    }
    if (this.props.isTreeSelect) {
      return (
        <TreeSelect
          style={{ minWidth: 220 }}
          value={[this.props.initialValue]}
          placeholder='请选择类目'
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          getPopupContainer={this.props.getPopupContainer}
          onSelect = {this.props.onSelect}
          showCheckedStrategy = {SHOW_PARENT}
          treeDefaultExpandAll={true}
        >
          {treeNode}
        </TreeSelect>
      )
    } else {
      return (
        <Tree
          showLine
          expandedKeys={this.state.expandedKeys}
          checkedKeys={this.state.checkedKeys}
          checkable= {this.props.checkable}
          onSelect = {this.props.onSelect}
          onCheck ={this.onCheck}
          onExpand={this.onExpand}
          selectedKeys ={this.props.selectedKeys}
        >
          {treeNode}
        </Tree>
      )
    }
  }
  loop(data) {
    if (!data || data.length === 0) {
      return
    }
    return data.map((item) => {
      // console.log(item.categoryId)
      if (item.childrens && item.childrens.length > 0) {
        return (
          <TreeNode
            title={item.categoryName}
            value={item.categoryId}
            key={item.categoryId}
            disableCheckbox={!(this.state.isInit || this.props.isEdit)}
            disabled={this.props.isTreeSelect && true}
          >
            {this.loop(item.childrens)}
          </TreeNode>
        )
      } else {
        return (
          <TreeNode
            title={item.categoryName}
            value={item.categoryId}
            key={item.categoryId}
            disableCheckbox={!(this.state.isInit || this.props.isEdit)}
          />
        )
      }
    })
  }
  onCheck(v, info) {
    this.setState({
      checkedKeys: v
    })
    this.props.onTreeCheck(v)
  }
  onExpand(v) {
    this.setState({
      expandedKeys: v
    })
  }
}
Classifytree.defaultProps = {
  checkable: false,
  checkedNode: [],
  selectedKeys: [],
  value: ''
}

export default Classifytree
