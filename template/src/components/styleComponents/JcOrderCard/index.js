import React from 'react'
import { Card, Row, Col, Icon } from 'antd'
import { JcDisplayItem } from '../index'
import noPic from 'images/no-image.png'
// import PropTypes from 'prop-types'
import './index.less'

const GoodsInfo = ({ goodsImage, property, goodsTitle, count, price }) => {
  return (
    <div className='jc-order-card-goods-container'>
      <img src={goodsImage || noPic} />
      <div className='jc-order-card-goods-info-container'>
        <JcDisplayItem label='商品名称' text={goodsTitle} />
        <p>
          {property && property.join(' ')} * {count}
        </p>
        <JcDisplayItem label='商品单价' text={`${price}元`} />
      </div>
    </div>
  )
}

class JcOrderCard extends React.Component {
  state = {
    expand: false
  }

  handleExpandChange = e => {
    this.setState({ expand: !this.state.expand })
  }

  render() {
    const { expand } = this.state
    const { goodsInfo, headerInfo, baseInfo, moreInfo, children } = this.props
    return (
      <div className='jc-order-card-container'>
        <Card>
          <Row type='flex' align='middle' className='jc-order-card-header'>
            <Col span={8}>
              {headerInfo[0] && <JcDisplayItem {...headerInfo[0]} />}
            </Col>
            <Col span={6}>
              {headerInfo[1] && <JcDisplayItem {...headerInfo[1]} />}
            </Col>
            <Col span={6}>
              {headerInfo[2] && <JcDisplayItem {...headerInfo[2]} />}
            </Col>
            <Col span={4} />
          </Row>
          <Row type='flex' className='jc-order-card-body'>
            <Col span={8} className='jc-order-card-border-right'>
              {goodsInfo
                .filter((goods, index) => (!expand ? index < 2 : true))
                .map(goods => <GoodsInfo key={goods.goodsId} {...goods} />)}
              {goodsInfo &&
                goodsInfo.length > 2 &&
                <div className='jc-order-card-show-more' onClick={this.handleExpandChange}>
                  {
                    !expand
                    ? (
                      <span>
                        <span>展开更多</span>
                        <Icon type='down' />
                      </span>
                    )
                    : (
                      <span>
                        <span>收起全部</span>
                        <Icon type='up' />
                      </span>
                    )
                  }
                </div>}
            </Col>
            <Col span={6} className='jc-order-card-border-right'>
              {baseInfo.map((item, index) => <JcDisplayItem key={index} {...item} />)}
            </Col>
            <Col span={6} className='jc-order-card-border-right'>
              {moreInfo.map((item, index) => <JcDisplayItem key={index} {...item} />)}
            </Col>
            <Col span={4} className='jc-order-card-action-container'>
              {children}
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

export default JcOrderCard
