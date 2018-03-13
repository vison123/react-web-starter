import React, { Component } from 'react'
import { Form, Card, Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import noPic from 'images/no-image.png'
import PropTypes from 'prop-types'
import style from './style.css'

const GoodsInfo = function(props) {
  if (!props.goods) {
    return (
      <div>暂无商品</div>
    )
  }
  let a = props.goods.map(function(good, index) {
    return (
      <Row
        className='good'
        key={index}
        style={{ paddingBottom: '15px', borderBottom: '1px solid #E5E5E5' }}
      >
        <Col span={10}>
          <img src={good.goodsImage ? good.goodsImage : noPic} />
        </Col>
        <Col
          span={10}
          className={style['good-info-right']}
        >
          <p className={style['logistic-info']}>名称：{good.goodsTitle}</p>
          <p>规格：{good.property && good.property.join(' ')}</p>
          <p>数量：{good.count}</p>
          <p>单价：{good.price}元</p>
        </Col>
      </Row>
    )
  })
  return <div> {a} </div>
}

class CardList extends Component {

  _renderButtons = buttons => {
    return (
      <Form.Item className={style['btn-container']}>
        {buttons.map((button, index) => {
          if (button.type === 'action') {
            return (
              <Link
                to={'#'}
                key={index}
                className={style['button']}
              >
                <Button
                  disabled={button.isDisable}
                  size={'small'}
                  type='default'
                  style={{ width: '80px' }}
                  onClick={() => button.onClick(this.props.form.getFieldsValue())}
                >
                  {button.desc}
                </Button>
              </Link>
            )
          } else if (button.type === 'link') {
            return (
              <Link
                key={index}
                className={style['button']}
                to={button.url}
              >
                <Button
                  type='default'
                  size={'small'}
                  style={{ width: '80px' }}
                >
                  {button.desc}
                </Button>
              </Link>
            )
          }
        })}
      </Form.Item>
    )
  }

  render () {
    const { cardData, buttons } = this.props

    return (
      cardData.map((data, index) => {
        return (
          <Card
            loading={cardData ? 0 : 1}
            key={index}
            hoverable={true}
            style={{ margin: '20px 0px' }}
          >
            <Row className={style['base-info']}>
              {
                data.cardHead.map((item, index) => {
                  return (
                    <Col
                      span={8}
                      key={index}
                    >{item.trem}：{item.data}
                    </Col>
                  )
                })
              }
            </Row>
            <div className={style['detail']}>
              <div className={style['left']}>
                {
                  data.cardGoodsInfo.map((item, index) => {
                    return (
                      <GoodsInfo
                        key={index}
                        goods={item.data}
                      />
                    )
                  })
                }
              </div>
              <div className={style['middle']} >
                {
                  data.cardPersonInfo.map((item, index) => {
                    return (
                      <Row key={index}>
                        <Col
                          span={8}
                          style={{ margin: '6px 0px' }}
                        >{item.trem}：
                        </Col>
                        <Col
                          className={style['logistic-info']}
                          span={16}
                          style={{ margin: '6px 0px' }}
                        >{item.data}
                        </Col>
                      </Row>
                    )
                  })
                }
              </div>
              <div className={style['order-info']} >
                {
                  data.cardOrderInfo.map((item, index) => {
                    return (
                      <Row key={index}>
                        <Col
                          span={10}
                          style={{ margin: '6px 0px' }}
                        >{item.trem}：
                        </Col>
                        <Col
                          span={14}
                          style={{ margin: '6px 0px' }}
                        >{item.data}
                        </Col>
                      </Row>
                    )
                  })
                }
              </div>
              {this._renderButtons(buttons)}
            </div>
          </Card>
        )
      })
    )
  }
}

CardList.propTypes = {
  cardData: PropTypes.array,
  buttons: PropTypes.array,
}

export default Form.create()(CardList)
