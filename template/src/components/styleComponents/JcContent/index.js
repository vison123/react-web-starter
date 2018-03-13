import React from 'react'
// import PropTypes from 'prop-types'

const JcContent = ({ padding = 26, children, ...otherProps }) => {
  return (
    <div
      style={{ padding, borderRadius: 4, background: '#fff' }}
      {...otherProps}
    >
      {children}
    </div>
  )
}

// WhiteSpace.propTypes = {
//   size: PropTypes.string
// }

export default JcContent
