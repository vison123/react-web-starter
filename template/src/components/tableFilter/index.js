import React, { Component } from 'react'
import { Form, Button, Input, Select, DatePicker, Row, Col } from 'antd'
import styles from './index.less'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ClassifyTree from 'components/classifytree'

const RangePicker = DatePicker.RangePicker
const Option = Select.Option

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 }
}

class TableFilter extends Component {

  _renderInput = formItem => {
    const { getFieldDecorator } = this.props.form
    return (
      getFieldDecorator(formItem.fieldName, {
        initialValue: formItem.initialValue || '',
        rules: formItem.rules
      })(
        <Input
          placeholder={'请输入' + formItem.label}
          autoComplete={'off'}
        />
      )
    )
  }

  _filterOption = (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  _renderSelect = formItem => {
    const { getFieldDecorator } = this.props.form
    return (
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

  _renderFormItem = formItems => {
    return formItems.map((formItem, index) => {
      return (
        <Col
          md={8}
          sm={24}
          key={index}
        >
          <Form.Item
            {...formItemLayout}
            label={formItem.label}
          >
            {(() => {
              switch (formItem.componentType) {
                case 'Input':
                  return this._renderInput(formItem)
                case 'Select':
                  return this._renderSelect(formItem)
                case 'RangePicker':
                  return this._renderRangePicker(formItem)
                case 'ClassifyTree':
                  return this._renderClassifyTree(formItem)
                default:
                  return <p>暂不支持</p>
              }
            })()}
          </Form.Item>
        </Col>
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

  render () {
    const { fields, buttons } = this.props
    return (
      <Form
        id={'form'}
        className={styles['form']}
      >
        <Row>
          {this._renderFormItem(fields)}
          {
            fields.length % 3 !== 0 &&
            this._renderButtons(buttons)
          }
        </Row>
        {
          fields.length % 3 === 0 &&
          <div className={styles['single-line']}>
            {this._renderButtons(buttons)}
          </div>
        }
      </Form>
    )
  }
}

TableFilter.propTypes = {
  fields: PropTypes.array,
  buttons: PropTypes.array
}

export default Form.create()(TableFilter)
