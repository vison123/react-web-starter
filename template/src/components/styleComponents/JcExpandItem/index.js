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
      <div>
        {
           text && text.length > 80
            ? (
              <div style={{ wordBreak: 'break-all' }}>
                { expand ? text : text.substring(0, 80) + '...'}
                <div style={{ cursor: 'pointer', fontSize: 12 }} onClick={() => { this.setState({ expand: !expand }) }}>{expand ? <span style={{ color: '#FD5729' }}>收起 <Icon type='up' /></span> : <span style={{ color: '#FD5729' }}>展开 <Icon type='down' /></span>}</div>
              </div>
            )
          : text
        }
      </div>
    )
  }
}

export default JcExpandItem
