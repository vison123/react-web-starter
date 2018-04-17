import React from 'react'
import classNames from 'classnames'
import { Tooltip, Form } from 'antd'
import { isString } from '../../../utils/lang'
import './index.less'
import { isNumber } from 'util'

const FormItem = Form.Item

class JcDisplayItem extends React.PureComponent {
  static defaultProps = {
    mode: 'view',
    labelAlign: 'left',
    labelColor: '#797878',
    textAlign: 'left',
    label: '',
    text: '',
    extra: '',
    style: {},
    maxLength: 30,
    extraClass: '',
    labelClass: '',
    labelWidth: ''
  }

  render() {
    const { mode, style, text, maxLength, children, extraClass, labelWidth, textAlign, labelAlign } = this.props
    /**
     * labelWidth ：label的字数
     * 通过 labelClass 来设置 label 的长度
     */

    let labelClass = labelWidth ? `labelWidth${labelWidth}` : ''

    let Class = classNames(
      'jc-display-item-container',
      `${extraClass}`,
      `${labelClass}`,
      { 'label-left': labelAlign === 'left' },
      { 'label-right': labelAlign === 'right' }
    )
    const renderText = () => {
      if (text) {
        if (isString(text) || isNumber(text)) {
          return (
            <div className='item-text' style={{ textAlign }}>
              {text.toString().length < maxLength ? (
                <span>{text}</span>
              ) : (
                <Tooltip placement='topLeft' title={text}>
                  <span style={{ cursor: 'pointer' }}>{text && text.toString().substring(0, maxLength)}...</span>
                </Tooltip>
              )}
            </div>
          )
        } else {
          return text
        }
      } else {
        return ''
      }
    }
    return (
      <FormItem className={Class} style={{ style }} {...this.props}>
        {mode === 'view' && renderText()}
        {mode === 'edit' && <div style={{ marginLeft: 8 }}>{children}</div>}
      </FormItem>
    )
  }
}

export default JcDisplayItem
