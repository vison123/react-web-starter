import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Col } from 'antd'
import styles from './index.css'
import responsive from './responsive'

const Description = ({ term, column, className, children, ...restProps }) => {
  const clsString = classNames(styles.description, className)
  return (
    <Col
      className={clsString}
      {...responsive[column]}
      {...restProps}
    >
      <Col>
        <Col span={9}>{term && <div className={styles.term}>{term}：</div>}</Col>
        <Col span={15}>{children && <div className={styles.detail}>{children}</div>}</Col>
      </Col>
    </Col>
  )
}

Description.defaultProps = {
  term: '',
  children: '',
}

Description.propTypes = {
  term: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}

export default Description
