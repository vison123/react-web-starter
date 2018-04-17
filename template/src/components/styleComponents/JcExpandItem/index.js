import React from 'react'
import { Icon } from 'antd'

class JcExpandItem extends React.Component {
  state ={
    expand: false
  }
  render() {
    const { text } = this.props
    const { expand } = this.state
    return (
      <div style={{ paddingTop: 10 }}>
        {
           text && text.length > 80
            ? (
              <div style={{ wordBreak: 'break-all' }}>
                <p style={{ margin: 0, textAlign: 'justify', lineHeight: '1.5' }}>
                  { expand ? text : text.substring(0, 80) + '...'}
                </p>
                <div style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => { this.setState({ expand: !expand }) }}>{expand ? <span style={{ color: '#1890ff' }}>收起 <Icon type='up' /></span> : <span style={{ color: '#1890ff' }}>展开 <Icon type='down' /></span>}</div>
              </div>
            )
          : text
        }
      </div>
    )
  }
}

export default JcExpandItem
