import React from 'react'
import { Tooltip, Form } from 'antd'
import './index.less'

const FormItem = Form.Item

class JcDisplayItem extends React.PureComponent {
  static defaultProps = {
    mode: 'view',
    labelAlign: 'left',
    labelColor: '#797878',
    label: '',
    text: '',
    extra: '',
    style: {},
    border: false,
    maxLength: 10
  }

  render() {
    const { mode, style, text, maxLength, children } = this.props
    const renderText = () => {
      if (text) {
        return (
          <div className='item-text'>
            {
              text.toString().length < maxLength
              ? <span>{text}</span>
              : (
                <Tooltip title={text}>
                  <span style={{ cursor: 'pointer' }}>
                    {text && text.toString().substring(0, maxLength)}...
                  </span>
                </Tooltip>
                )
              }
          </div>
        )
      }
    }
    // todo 通过className来控制label部分的颜色
    return (
      <FormItem
        className='jc-display-item-container'
        style={{ style }}
        {...this.props}
      >
        {mode === 'view' && renderText()}
        {mode === 'edit' && children}
      </FormItem>
    )
  }
}

export default JcDisplayItem
