import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import styles from './index.css'
import { isArray } from '../../../utils/lang'

const none = () => {}

const DataCard = ({
  list,
  onClick = none,
  numberColor = '#fd5729',
  numberFontSize = 30,
  titleColor = '#a3a3a3',
  titleFontSize = 14
}) => {
  const handleClick = (e, item) => {
    e.preventDefault()
    onClick(item)
  }
  return (
    <Row className={styles['card-list']}>
      {isArray(list) &&
        list.length > 0 &&
        list.map(item => {
          return (
            <Col
              key={item.id}
              className={styles['card-item']}
              span={24 / list.length}
              onClick={e => handleClick(e, item)}
            >
              <p style={{ color: numberColor, fontSize: numberFontSize }}>
                {item.number}
              </p>
              <p style={{ color: titleColor, fontSize: titleFontSize }}>
                {item.title}
              </p>
            </Col>
          )
        })}
    </Row>
  )
}

DataCard.propTypes = {
  list: PropTypes.array.isRequired,
  numberColor: PropTypes.string,
  titleColor: PropTypes.string,
  numberFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default DataCard
