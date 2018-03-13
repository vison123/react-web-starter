import React, { Component } from 'react'
import { connect } from 'react-redux'
import Classifytree from 'components/classifytree'
import CitySelect from 'components/cityselect'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCheckable: true,
      isTreeSelect: false,
      value: '类目1.1.2',
      checkedKeys: ['db44004c0e404972996459df3defe7f8']
    }
    const methods = ['onSelect', 'onCheck']
    methods.map((i) => {
      this[i] = this[i].bind(this)
    })
  }
  render() {
    return (
      <div>
        <Classifytree
          checkable={this.state.isCheckable}
          onSelect={this.onSelect}
          onTreeCheck={this.onCheck}
          checkedNode={this.state.checkedKeys}
          isTreeSelect ={this.state.isTreeSelect}
          treeData={this.props.treeData}
          value={this.state.value}
          isEdit={true}
        />
        <CitySelect />
      </div>
    )
  }
  onSelect(v) {
    console.log(v)
  }
  onCheck(v) {
    console.log(v)
  }
}

const mapStateToProps = (state) => {
  return {
    treeData: state.tree.treeData
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
