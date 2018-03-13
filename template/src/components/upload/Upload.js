import React from 'react'
import RcUpload from 'rc-upload'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import UploadList from './UploadList'
// import { Icon } from 'antd'

import { T, fileToObject, genPercentAdd, getFileItem, removeFileItem, changeIndex } from './utils'
import './style'

const defaultLocale = {
  uploading: '文件上传中',
  removeFile: '删除文件',
  uploadError: '上传错误',
  previewFile: '预览文件',
}

export default class Upload extends React.Component {

  static defaultProps = {
    prefixCls: 'ant-upload',
    type: 'select',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    beforeUpload: T,
    showUploadList: true,
    listType: 'text', // or pictrue
    className: '',
    disabled: false,
    supportServerRender: true,
    needOrder: false
  }

  static contextTypes = {
    antLocale: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      fileList: this.props.fileList || this.props.defaultFileList || [],
      dragState: 'drop',
    }
  }

  componentWillUnmount() {
    this.clearProgressTimer()
  }

  getLocale() {
    let locale = {}
    if (this.context.antLocale && this.context.antLocale.Upload) {
      locale = this.context.antLocale.Upload
    }
    return {
      ...defaultLocale,
      ...locale,
      ...this.props.locale,
    }
  }

  onStart = (file, isReUpload, index) => {
    let targetItem = null
    let nextFileList = this.state.fileList.concat()
    if (isReUpload) {
      targetItem = fileToObject(file)
      targetItem.status = 'uploading'
      const { fileList } = this.state
      fileList.splice(index, 1, targetItem)
      nextFileList = fileList
    } else {
      if (file.length > 0) {
        targetItem = file.map(f => {
          const fileObject = fileToObject(f)
          fileObject.status = 'uploading'
          return fileObject
        })
        nextFileList = nextFileList.concat(targetItem)
      } else {
        targetItem = fileToObject(file)
        targetItem.status = 'uploading'
        nextFileList.push(targetItem)
      }
    }
    this.onChange({
      file: targetItem,
      fileList: nextFileList,
    })
    // fix ie progress
    if (!(window).FormData) {
      this.autoUpdateProgress(0, targetItem)
    }
  }

  autoUpdateProgress(_, file) {
    const getPercent = genPercentAdd()
    let curPercent = 0
    this.clearProgressTimer()
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent)
      this.onProgress({
        percent: curPercent,
      }, file)
    }, 200)
  }

  onSuccess = (response, file) => {
    this.clearProgressTimer()
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (e) { /* do nothing */
    }
    let fileList = this.state.fileList
    let targetItem = getFileItem(file, fileList)
    // removed
    if (!targetItem) {
      return
    }
    targetItem.status = 'done'
    targetItem.response = response
    this.onChange({
      file: { ...targetItem },
      fileList,
    })
  }

  onProgress = (e, file) => {
    let fileList = this.state.fileList
    let targetItem = getFileItem(file, fileList)
    // removed
    if (!targetItem) {
      return
    }
    targetItem.percent = e.percent
    this.onChange({
      event: e,
      file: { ...targetItem },
      fileList: this.state.fileList,
    })
  }

  onError = (error, response, file) => {
    this.clearProgressTimer()
    let fileList = this.state.fileList
    let targetItem = getFileItem(file, fileList)
    // removed
    if (!targetItem) {
      return
    }
    targetItem.error = error
    targetItem.response = response
    targetItem.status = 'error'
    this.onChange({
      file: { ...targetItem },
      fileList,
    })
  }

  handleRemove(file) {
    const { onRemove } = this.props

    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
      // Prevent removing file
      if (ret === false) {
        return
      }

      const removedFileList = removeFileItem(file, this.state.fileList)
      if (removedFileList) {
        this.onChange({
          file,
          fileList: removedFileList,
        })
      }
    })
  }

  handleManualRemove = (file) => {
    this.refs.upload.abort(file)
    file.status = 'removed' // eslint-disable-line
    this.handleRemove(file)
  }

  onChange = (info) => {
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList })
    }

    const { onChange } = this.props
    if (onChange) {
      onChange(info)
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList || [],
      })
    }
  }

  onFileDrop = (e) => {
    this.setState({
      dragState: e.type,
    })
  }

  beforeUpload = (file, fileList) => {
    if (!this.props.beforeUpload) {
      return true
    }
    const result = this.props.beforeUpload(file, fileList)
    if (result === false) {
      return false
    } else if (result && (result).then) {
      return result
    }
    return true
  }

  clearProgressTimer() {
    clearInterval(this.progressTimer)
  }

  _orderChange = (file, value) => {
    const modifyFileList = changeIndex(file, this.state.fileList, value)
    this.onChange({
      fileList: modifyFileList
    })
  }

  render() {
    const {
      prefixCls = '', showUploadList, listType, onPreview,
      type, disabled, children, className, needOrder
    } = this.props

    const rcUploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      beforeUpload: this.beforeUpload,
    }

    delete rcUploadProps.className

    const { showRemoveIcon, showPreviewIcon } = showUploadList
    const uploadList = showUploadList ? (
      <UploadList
        listType={listType}
        items={this.state.fileList}
        onPreview={onPreview}
        onRemove={this.handleManualRemove}
        showRemoveIcon={showRemoveIcon}
        showPreviewIcon={showPreviewIcon}
        locale={this.getLocale()}
        orderChange={this._orderChange}
        needOrder={needOrder}
        reUploadRender={index => {
          // return (
          //   <RcUpload {...rcUploadProps} onStart={(file) => this.onStart(file, true, index)} ref='upload'>
          //     <Icon type='reload' />
          //   </RcUpload>
          // )
          return null
        }}
      />
    ) : null

    if (type === 'drag') {
      const dragCls = classNames(prefixCls, {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: this.state.fileList.some(file => file.status === 'uploading'),
        [`${prefixCls}-drag-hover`]: this.state.dragState === 'dragover',
        [`${prefixCls}-disabled`]: disabled,
      })
      return (
        <span className={className}>
          <div
            className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
          >
            <RcUpload
              {...rcUploadProps}
              ref='upload'
              className={`${prefixCls}-btn`}
            >
              <div className={`${prefixCls}-drag-container`}>
                {children}
              </div>
            </RcUpload>
          </div>
          {uploadList}
        </span>
      )
    }

    const uploadButtonCls = classNames(prefixCls, {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    })

    const uploadButton = (
      <div
        className={uploadButtonCls}
        style={{ display: children ? '' : 'none' }}
      >
        <RcUpload
          {...rcUploadProps}
          ref='upload'
        />
      </div>
    )

    if (listType === 'picture-card') {
      return (
        <span className={className}>
          {uploadList}
          {uploadButton}
        </span>
      )
    }
    return (
      <span className={className}>
        {uploadButton}
        {uploadList}
      </span>
    )
  }
}
