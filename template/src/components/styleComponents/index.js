import React from 'react'
import { Icon } from 'antd'
import WhiteSpace from './WhiteSpace'
import JcContent from './JcContent'
import JcFilter from './JcFilter'
import { SingleCard, MultiCard } from './JcMutipleCard'
import JcDisplayItem from './JcDisplayItem'
import JcOrderCard from './JcOrderCard'
import JcDetailRowItem from './JcDetailRowItem'
import JcMediaDisplay from './JcMediaDisplay'
import JcCommoditySet from './JcCommoditySet'
import JcExpandItem from './JcExpandItem'

const UpLoadBtn = ({ type = 'picture' }) => (
  <div>
    <Icon type='plus' style={{ fontSize: 24 }} />
    <div className='ant-upload-text'>图片上传</div>
  </div>
)

export {
  WhiteSpace,
  JcContent,
  JcFilter,
  SingleCard,
  MultiCard,
  JcDisplayItem,
  JcOrderCard,
  JcDetailRowItem,
  JcMediaDisplay,
  JcCommoditySet,
  UpLoadBtn,
  JcExpandItem
}
