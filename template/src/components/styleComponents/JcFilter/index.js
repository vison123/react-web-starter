import React, { Component } from 'react'
import { Form, Button, Input, Select, DatePicker, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ClassifyTree from 'components/classifytree'
import './index.less'

const RangePicker = DatePicker.RangePicker
const Option = Select.Option
const FormItem = Form.Item

class JcFilter extends Component {
  _renderInput = formItem => {
    const { getFieldDecorator } = this.props.form
    return getFieldDecorator(formItem.fieldName, {
      initialValue: formItem.initialValue || '',
      rules: formItem.rules
    })(<Input
      style={{ width: '100%' }}
      placeholder={'请输入' + formItem.label}
      autoComplete={'off'}
       />)
  }

  _filterOption = (input, option) => {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  _renderSelect = formItem => {
    const { getFieldDecorator } = this.props.form
    return getFieldDecorator(formItem.fieldName, {
      initialValue: formItem.initialValue || undefined,
      rules: formItem.rules
    })(
      <Select
        style={{ width: '100%' }}
        showSearch={formItem.showSearch || false}
        placeholder={'请选择' + formItem.label}
        getPopupContainer={() => document.getElementById('form')}
        filterOption={this._filterOption}
      >
        {formItem.dictionary && formItem.dictionary.map(dictItem => {
          return (
            <Option
              key={dictItem.key}
              value={dictItem.key}
            >
              {dictItem.value}
            </Option>
          )
        })}
      </Select>
    )
  }

  _renderRangePicker = formItem => {
    const { getFieldDecorator } = this.props.form
    return getFieldDecorator(formItem.fieldName, { rules: formItem.rules })(
      <RangePicker
        style={{ width: '100%' }}
        format={'YYYY-MM-DD HH:mm:ss'}
        placeholder={['开始日期', '结束日期']}
        showTime={{
          hideDisabledOptions: false
        }}
      />
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
          <FormItem label={formItem.label}>
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
          </FormItem>
        </Col>
      )
    })
  }

  _renderButtons = buttons => {
    return (
      <span className='jc-filter-btn'>
        {buttons.map((button, index) => {
          if (button.type === 'action') {
            return (
              <Button
                style={{ marginLeft: index === 0 ? 0 : 8 }}
                key={index}
                type={button.btnType || 'default'}
                onClick={() => button.onClick(this.props.form.getFieldsValue())}
              >
                {button.desc}
              </Button>
            )
          } else if (button.type === 'link') {
            return (
              <Link
                key={index}
                to={button.url}
              >
                <Button
                  type='default'
                  style={{ marginLeft: index === 0 ? 0 : 8 }}
                >
                  {button.desc}
                </Button>
              </Link>
            )
          }
        })}
      </span>
    )
  }

  render() {
    const { fields, buttons } = this.props
    return (
      <div className='jc-filter'>
        <Form
          id='form'
          layout='inline'
        >
          <Row
            gutter={{ md: 8, lg: 24, xl: 48 }}
            type='flex'
            align='middle'
          >
            {this._renderFormItem(fields)}
            {fields.length % 3 !== 0 &&
            <div style={{ overflow: 'hidden', flex: '1' }}>
              <div style={{ float: 'right' }}>
                {this._renderButtons(buttons)}
              </div>
            </div>}
          </Row>
          {fields.length % 3 === 0 &&
            <div style={{ overflow: 'hidden' }}>
              <div style={{ float: 'right' }}>
                {this._renderButtons(buttons)}
              </div>
            </div>}
        </Form>
      </div>
    )
  }
}

JcFilter.propTypes = {
  fields: PropTypes.array,
  buttons: PropTypes.array
}

export default Form.create()(JcFilter)
