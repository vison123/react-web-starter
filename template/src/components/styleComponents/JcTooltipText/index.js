import React from 'react'
import { Tooltip } from 'antd'

export default (props) => {
  return props.text && props.text.length >= props.maxLength ? (
    <Tooltip title={props.text}>
      <span>{props.text.substring(0, props.maxLength) + '...'}</span>
    </Tooltip>
  ) : props.text
}
