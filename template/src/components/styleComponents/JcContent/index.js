import React from 'react'
// import PropTypes from 'prop-types'

const JcContent = ({ padding = 26, children, background = '#fff', ...otherProps }) => {
  return (
    <div style={{ padding, borderRadius: 4, height: '100%', background }} {...otherProps}>
      {children}
    </div>
  )
}

// WhiteSpace.propTypes = {
//   size: PropTypes.string
// }

export default JcContent
