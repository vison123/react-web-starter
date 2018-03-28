import React from 'react'
import { isArray } from '../../../utils/lang'

const JcMedia = ({ url, onPreview }) => {
  const preview = e => {
    e.preventDefault()
    onPreview(url)
  }
  return (
    <div className='ant-upload-list ant-upload-list-picture-card'>
      <div className='ant-upload-list-item ant-upload-list-item-undefined'>
        <div className='ant-upload-list-item-info'>
          <span>
            <a className='ant-upload-list-item-thumbnail' href={url} target='_blank' rel='noopener noreferrer'>
              <img src={url} />
            </a>
            <a href={url} target='_blank' rel='noopener noreferrer' className='ant-upload-list-item-name' />
          </span>
        </div>
        <span className='ant-upload-list-item-actions'>
          <a onClick={preview} rel='noopener noreferrer' title='预览文件'>
            <i className='anticon anticon-eye-o' />
          </a>
        </span>
      </div>
    </div>
  )
}

const JcMediaDisplay = ({ medias, onPreview }) => {
  const renderMedias = () => {
    if (medias) {
      if (isArray(medias) && medias.length > 0) {
        return medias.map((item, index) => {
          return (
            <JcMedia key={index} url={item} onPreview={url => onPreview({ url })} />
          )
        })
      } else if (medias.length > 0) {
        return (
          <JcMedia url={medias} onPreview={url => onPreview({ url })} />
        )
      } else {
        return <p>暂无数据</p>
      }
    } else {
      return <p>暂无数据</p>
    }
  }
  return (
    <div>
      {renderMedias()}
    </div>
  )
}

export default JcMediaDisplay
