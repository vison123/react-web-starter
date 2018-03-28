import React from 'react'
import { Card, Row, Col, Icon, Checkbox } from 'antd'
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
          {property && property.length > 0 ? `${property.join(' ')}*` : '数量：'} {count}
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

  static defaultProps = {
    checkAble: false,
  }

  handleExpandChange = e => {
    this.setState({ expand: !this.state.expand })
  }

  render() {
    const { expand } = this.state
    const { goodsInfo, headerInfo, baseInfo, moreInfo, children, onCheck, checkAble, checked } = this.props
    return (
      <div className='jc-order-card-container'>
        <Card>
          <Row type='flex' align='middle' className='jc-order-card-header'>
            <Col span={1}>
              {checkAble && <Checkbox checked={checked} style={{ marginLeft: 24 }} onChange={onCheck} />}
            </Col>
            <Col span={7}>
              {headerInfo[0] && <JcDisplayItem labelAlign='right' {...headerInfo[0]} />}
            </Col>
            <Col span={7}>
              {headerInfo[1] && <JcDisplayItem labelAlign='right' {...headerInfo[1]} />}
            </Col>
            <Col span={8}>
              {headerInfo[2] && <JcDisplayItem labelAlign='right' {...headerInfo[2]} />}
            </Col>
          </Row>
          <Row type='flex' className='jc-order-card-body'>
            <Col span={8} className='jc-order-card-border-right'>
              {goodsInfo
                .filter((goods, index) => (!expand ? index < 2 : true))
                .map((goods, index) => <GoodsInfo key={index} {...goods} />)}
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
              {
                baseInfo.map((item, index) => {
                  return (
                    <JcDisplayItem labelAlign='right' key={index} {...item} maxLength={15} />
                  )
                })
              }
            </Col>
            <Col span={6} className='jc-order-card-border-right'>
              {moreInfo.map((item, index) => <JcDisplayItem labelAlign='right' key={index} {...item} />)}
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
