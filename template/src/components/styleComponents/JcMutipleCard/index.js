import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import styles from './index.css'
import { isArray } from '../../../utils/lang'

const none = () => {}

export const SingleCard = ({
  onClick = none,
  list,
  numberColor = '#fff',
  numberFontSize = 36,
  titleColor = '#fff',
  titleFontSize = 20
}) => {
  const handleClick = (e, item) => {
    e.preventDefault()
    onClick(item)
  }
  return (
    <Row gutter={16} className={styles['single-card-wrap']}>
      {isArray(list) &&
        list.length > 0 &&
        list.map(item => {
          return (
            <Col
              className={styles['wave-wrap']}
              xxl={6}
              md={8}
              sm={12}
              key={item.id}
              onClick={e => handleClick(e, item)}
            >
              <div
                style={{
                  background: item.cardBackGround
                    ? item.cardBackGround
                    : 'linear-gradient(-90deg, #3CB9B3 0%, #49E395 100%)'
                }}
                className={styles['card-item']}
              >
                <p style={{ color: titleColor, fontSize: titleFontSize }}>
                  {item.title}
                </p>
                <h5 style={{ color: numberColor, fontSize: numberFontSize }}>
                  {item.number ? item.number : '0'}
                </h5>
              </div>
              <svg className={styles['wave']} width='400px' height='200px'>
                <path
                  fill='rgba(255, 255, 255, 0.2)'
                  d='M 0 100 C 140.6 94.24 45.08 106.32 400 100 A 95 95 0 0 1 0 100 Z'
                >
                  <animate
                    dur={item.dur}
                    repeatCount='indefinite'
                    attributeName='d'
                    attributeType='XML'
                    values='M0 100 C90 28, 190 179, 400 100 A95 95 0 0 1 0 100 Z;
			M0 100 C145 100, 80 100, 400 100 A95 95 0 0 1 0 100 Z;
			M0 100 C90 28, 190 179, 400 100 A95 95 0 0 1 0 100 Z'
                  />
                </path>
              </svg>
            </Col>
          )
        })}
    </Row>
  )
}

export const MultiCard = ({
  onClick = none,
  list,
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
    <Row className={styles['multi-card-wrap']}>
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
                {item.number ? item.number : '0'}
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

SingleCard.propTypes = {
  list: PropTypes.array.isRequired,
  numberColor: PropTypes.string,
  titleColor: PropTypes.string,
  numberFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

MultiCard.propTypes = {
  list: PropTypes.array.isRequired,
  numberColor: PropTypes.string,
  titleColor: PropTypes.string,
  numberFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  titleFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
