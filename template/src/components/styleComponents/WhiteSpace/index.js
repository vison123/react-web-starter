import React from 'react'
import PropTypes from 'prop-types'

const renderSpace = size => {
  if (size === 'sm') {
    return <div style={{ height: '8px' }} />
  } else if (size === 'md') {
    return <div style={{ height: '16px' }} />
  } else if (size === 'lg') {
    return <div style={{ height: '24px' }} />
  }
}

const WhiteSpace = ({ size = 'md' }) => {
  return (
    <div>
      {renderSpace(size)}
    </div>
  )
}

WhiteSpace.propTypes = {
  size: PropTypes.string
}

export default WhiteSpace
