import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { isArray } from '../../../utils/lang'

const RowItem = ({ fields, labelWidth }) => {
  return (
    <Row gutter={{ md: 8, lg: 24, xl: 48 }} type='flex' align='middle'>
      {isArray(fields) &&
        fields.length > 0 &&
        fields.map((item, index) => {
          return (
            <Col md={item.colSpan ? item.colSpan : 8} sm={24} key={index}>
              <p style={{ width: labelWidth, display: 'inline-block' }}>
                {item.label}
              </p>
              <p style={{ display: 'inline-block' }}>
                {item.text}
              </p>
            </Col>
          )
        })}
    </Row>
  )
}

RowItem.propTypes = {
  fields: PropTypes.array,
  colSpan: PropTypes.number,
  labelWidth: PropTypes.string
}

export default RowItem
