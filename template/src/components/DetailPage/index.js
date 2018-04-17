import React, { Component } from 'react'
import { Form, Button, Input, Select, DatePicker, Row, Card, Col, Radio, Table, Upload, Modal, Icon, Checkbox } from 'antd'
import styles from './style.less'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ClassifyTree from 'components/classifytree'
import DescriptionList from '../../components/DescriptionList'

const RangePicker = DatePicker.RangePicker
const Option = Select.Option
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group
const { Description } = DescriptionList
import Selector from '../../modules/commodity/meal/commodity/PropertySelector'

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 }
}

const formItemLayoutLarge = {
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
}

class DetailPage extends Component {

  _renderInput = formItem => {
    const { getFieldDecorator } = this.props.form
    return (
      <Col span={8}>
        <Form.Item
          {...formItemLayout}
          label={formItem.label}
        >
          {
            getFieldDecorator(formItem.fieldName, {
              initialValue: formItem.initialValue || '',
              rules: formItem.rules
            })(
              <Input
                placeholder={'请输入' + formItem.label}
                autoComplete={'off'}
              />
            )
          }
        </Form.Item>
      </Col>
    )
  }

  _filterOption = (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  _renderSelect = formItem => {
    const { getFieldDecorator } = this.props.form
    return (
      <Col span={8}>
        <Form.Item
          {...formItemLayout}
          label={formItem.label}
        >
          {
            getFieldDecorator(formItem.fieldName, {
              initialValue: formItem.initialValue || undefined,
              rules: formItem.rules
            })(
              <Select
                showSearch={formItem.showSearch || false}
                placeholder={'请选择' + formItem.label}
                getPopupContainer={() => document.getElementById('form')}
                filterOption={this._filterOption}
              >
                {
                  formItem.dictionary.map((dictItem) => {
                    return (
                      <Option
                        key={dictItem.key}
                        value={dictItem.key}
                      >
                        {dictItem.value}
                      </Option>
                    )
                  })
                }
              </Select>
            )
          }
        </Form.Item>
      </Col>
    )
  }

  _renderRangePicker = formItem => {
    const { getFieldDecorator } = this.props.form
    return (
      getFieldDecorator(formItem.fieldName, { rules: formItem.rules })(
        <RangePicker
          style={{ width: '100%' }}
          format={'YYYY-MM-DD HH:mm:ss'}
          placeholder={['开始日期', '结束日期']}
          showTime={{
            hideDisabledOptions: false,
          }}
        />
      )
    )
  }

  _renderRadio = formItem => {
    const { getFieldDecorator } = this.props.form
    return (
      <Col span={8}>
        <Form.Item
          {...formItemLayout}
          label={formItem.label}
        >
          {
            getFieldDecorator(formItem.fieldName, {
              initialValue: formItem.initialValue || undefined,
              rules: formItem.rules
            })(
              <RadioGroup>
                {
                  formItem.dictionary.map((dictItem) => {
                    return (
                      <Radio
                        key={dictItem.key}
                        value={dictItem.key}
                      >
                        {dictItem.value}
                      </Radio>
                    )
                  })
                }
              </RadioGroup>
            )
          }
        </Form.Item>
      </Col>
    )
  }

  _renderCheckbox = formItem => {
    const { getFieldDecorator } = this.props.form
    return (
      <Col span={8}>
        <Form.Item
          {...formItemLayout}
          label={formItem.label}
        >
          {
            getFieldDecorator(formItem.fieldName, {
              initialValue: formItem.initialValue || undefined,
              rules: formItem.rules
            })(
              <CheckboxGroup>
                {
                  formItem.dictionary.map((dictItem) => {
                    return (
                      <Checkbox
                        style={{ marginTop: '10px' }}
                        key={dictItem.key}
                        value={dictItem.key}
                      >
                        {dictItem.value}
                      </Checkbox>
                    )
                  })
                }
              </CheckboxGroup>
            )
          }
        </Form.Item>
      </Col>
    )
  }

  _renderClassifyTree = formItem => {
    return (
      <ClassifyTree
        allowClear={false}
        isTreeSelect={true}
        treeData={formItem.treeData}
        onSelect={formItem.onSelect}
      />
    )
  }

  _renderPropertyPull = formItem => {
    return (
      <Form.Item>
        {
          formItem.property.propertyPull.map((m, i) => {
            return (
              <Selector
                list={m}
                key={i}
                index={i}
              />
            )
          })
        }
        {
          formItem.property.propertyPull.length < 1 &&
          <Button
            style={{ margin: '0 16px 15px 0' }}
            onClick={formItem.propertyEvent._addPropertySelector}
          >添加规格属性
          </Button>
        }
        {
          formItem.property.length > 0 &&
          <Button
            style={{ marginBottom: '15px' }}
            onClick={formItem.propertyEvent._handleConfirm}
          >
            确认
          </Button>
        }
        {
          formItem.property.propertyColumns.length > 0 &&
          <Table
            bordered
            columns={formItem.propertyEvent._getColumns}
            dataSource={formItem.propertyEvent._getData}
            pagination={false}
          />
        }
      </Form.Item>
    )
  }

  _renderCommodityImg = formItem => {
    const { getFieldDecorator } = this.props.form
    return (
      <Form.Item
        {...formItemLayoutLarge}
        label={formItem.label}
      >
        {
          getFieldDecorator(formItem.fieldName, {
            valuePropName: 'fileList',
            getValueFromEvent: (e) => formItem.CommodityImgEvent._processFileUpload(e, formItem.CommodityImgEvent.setGoodsImage),
            initialValue: formItem.initialValue,
            rules: formItem.rules
          })(
            <Upload
              listType='picture-card'
              action='http://upload.qiniu.com'
              beforeUpload={formItem.CommodityImgEvent.beforeUpload}
              data={{ token: formItem.CommodityImgState.qiniuToken }}
              accept='image/jpg, image/jpeg, image/png'
              onPreview = {formItem.CommodityImgEvent.onPreview}
              onChange={formItem.CommodityImgEvent.onChange}
              needOrder={true}
              onRemove={this.props.pageType === 'edit'}
            >
              {
                formItem.CommodityImgState.imageList < formItem.CommodityImgState.imageNum && this.props.pageType === 'edit' ? (
                  <div>
                    <Icon type='plus' />
                    <div className='ant-upload-text'>上传图像</div>
                  </div>) : null
              }
            </Upload>
          )
        }
        <Modal
          visible={formItem.CommodityImgState.modalVisible}
          footer={null}
          onCancel={formItem.CommodityImgEvent._coverCancel}
        >
          <img
            alt='example'
            style={{ width: '100%', height: '100%' }}
            src={formItem.CommodityImgState.preview}
          />
        </Modal>
      </Form.Item>
    )
  }

  _renderTable = formItem => {
    return (
      <Col>
        <Table
          columns={formItem.columns}
          dataSource={formItem.dataSource}
          rowKey={(item, index) => index}
          bordered={true}
          pagination={formItem.pagination}
        />
        {
          formItem.tableFooter && formItem.tableFooter.map((footer, index) => {
            return (
              <div
                className={styles['footer']}
                key={index}
              >
                <div>{footer.label}：
                  <span>{footer.text}</span>
                </div>
              </div>
            )
          })
        }
      </Col>
    )
  }

  _renderFormItem = formItems => {
    return formItems.map((formItem, index) => {
      return (
        <Card
          title={formItem.cardTitle}
          key={index}
          bordered={false}
          style={{ marginBottom: 24 }}
        >
          {formItem.detail.map(item => {
            switch (item.componentType) {
              case 'Input':
                return this._renderInput(item)
              case 'Select':
                return this._renderSelect(item)
              case 'RangePicker':
                return this._renderRangePicker(item)
              case 'ClassifyTree':
                return this._renderClassifyTree(item)
              case 'Radio':
                return this._renderRadio(item)
              case 'Checkbox':
                return this._renderCheckbox(item)
              case 'Property':
                return this._renderPropertyPull(item)
              case 'CommodityImg':
                return this._renderCommodityImg(item)
              case 'Table':
                return this._renderTable(item)
              default:
                return <p>暂不支持</p>
            }
          })}
        </Card>
      )
    })
  }

  _renderButtons = buttons => {
    return (
      <Form.Item className={styles['btn-container']}>
        {buttons.map((button, index) => {
          if (button.type === 'action') {
            return (
              <Button
                key={index}
                type='primary'
                className={styles['button']}
                onClick={() => button.onClick(this.props.form.getFieldsValue())}
              >
                {button.desc}
              </Button>
            )
          } else if (button.type === 'link') {
            return (
              <Link
                key={index}
                className={styles['button']}
                to={button.url}
              >
                <Button type='primary'>{button.desc}</Button>
              </Link>
            )
          }
        })}
      </Form.Item>
    )
  }

  _renderPageType = (formItem) => {
    if (this.props.pageType === 'see') {
      return this._renderDetail(formItem)
    } else if (this.props.pageType === 'edit') {
      return this._renderFormItem(formItem)
    }
  }

  _renderDetail = formItem => {
    return formItem.map((cards, index) => {
      if (cards.cardType === 'Img') {
        return this._renderFormItem(formItem.filter(item => item.cardType === 'Img'))
      } else if (cards.cardType === 'Property') {
        return this._renderFormItem(formItem.filter(item => item.cardType === 'Property'))
      } else if (cards.cardType === 'Table') {
        return this._renderFormItem(formItem.filter(item => item.cardType === 'Table'))
      } else {
        return (
          <Card
            key={index}
            title={cards.cardTitle}
            style={{ marginBottom: 24 }}
            bordered={false}
          >
            <DescriptionList
              key={index}
              style={{ marginBottom: 24 }}
            >
              {
                cards.detail.map((item, index) => {
                  return (
                    <Description
                      key={index}
                      term={item.label}
                      style={{ marginBottom: 24 }}
                    >{item.viewValue}
                    </Description>
                  )
                })
              }
            </DescriptionList>
          </Card>
        )
      }
    })
  }

  render () {
    const { details, buttons, pageType, goodsId } = this.props
    return (
      <Form
        id={'form'}
        className={styles['form']}
      >
        {
          goodsId && (
            <Card
              bordered={false}
            >
              <Col
                span={20}
                style={{ fontSize: '16px', fontWeight: '500' }}
              >商品Id：{goodsId}
              </Col>
              {
                pageType === 'edit' && (
                  <Col span={4}>
                    {this._renderButtons(buttons)}
                  </Col>
                )
              }
            </Card>
          )
        }
        <Row>
          {this._renderPageType(details)}
        </Row>
      </Form>
    )
  }
}

DetailPage.propTypes = {
  details: PropTypes.array,
  buttons: PropTypes.array
}

export default Form.create()(DetailPage)
