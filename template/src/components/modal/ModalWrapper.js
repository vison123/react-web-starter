import React from 'react'
import ReactDOM from 'react-dom'
import { Modal } from 'antd'

const showModalWrapper = (component, params = {}) => {
  const maskDiv = document.createElement('div')
  document.body.appendChild(maskDiv)

  const _close = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(maskDiv)
    if (unmountResult) {
      maskDiv.parentNode.removeChild(maskDiv)
    }
  }

  class ModalWrapper extends React.Component {
    render() {
      return (
        <Modal
          visible={true}
          onCancel={_close}
          maskClosable={false}
          footer={null}
          {...params}
        >
          {React.cloneElement(component, {
            onCancel: _close,
          })}
        </Modal>
      )
    }
  }

  ReactDOM.render(
    React.createElement(ModalWrapper),
    maskDiv
  )
}

export { showModalWrapper }
