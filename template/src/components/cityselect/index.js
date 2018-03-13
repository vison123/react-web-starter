import React, { Component } from 'react'
import { Cascader } from 'antd'
import { connect } from 'react-redux'

class citySelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
  }

  render() {
    const cityData = this.props.cityData
    if (!Object.keys(!cityData ? {} : cityData).length) {
      return (
        <div />
      )
    }
    let options = this.formatData(cityData.data)
    return (
      <Cascader
        options={options}
        loadData={this.onLoadData}
        onChange={this.props.onChange}
        placeholder='请选择省市区'
        style={{ width: 320 }}
        changeOnSelect
      />
    )
  }

  formatData = data => {
    data && data.map((item) => {
      item['value'] = item.regionId
      item['label'] = item.regionName
      if (item.children && item.children.length > 0) {
        this.formatData(item.children)
      }
    })
    return data
  }
}

const mapStateToProps = (state) => {
  return {
    cityData: state.common.citySelect,
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(citySelect)

