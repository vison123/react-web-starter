import React from 'react'
import { Row, Divider, Button, Icon, Table } from 'antd'
import { JcDisplayItem } from '../index'

const JcCommoditySet = ({ mode, goodsContent, pricesShowModal, removeGoods, editShowModal, removeMenu }) => {
  // const renderActionTotal = (content, index) => {
  //   if (mode === 'edit') {
  //     return (
  //       <span style={{ lineHeight: '39px' }}>
  //         {goodsContent.length > 1 &&
  //           <a style={{ margin: 4 }} onClick={() => removeGoods(content.id)}>删除</a>}
  //         {!goodsContent[0].title &&
  //         <a style={{ margin: 4 }} onClick={() => editShowModal(1, content.id, content)}>编辑</a>}
  //         <a style={{ margin: 4 }} onClick={() => pricesShowModal(1, content.id, index)}>新增</a>
  //       </span>
  //     )
  //   }
  // }

  // <span style={{ lineHeight: '39px' }}>
  //                             <a onClick={() => editShowModal(2, content.id, item)}>编辑</a>
  //                             <Divider type='vertical' />
  //                             <a onClick={() => removeMenu(content.id, item.contentId)}>删除</a>
  //                             <Divider type='vertical' />
  //                             <a onClick={() => pricesShowModal(2, content.id, j)}>新增</a>
  //                           </span>

  const baseColumns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '份数',
      dataIndex: 'count',
      key: 'count'
    },
    {
      title: '价格(元)',
      dataIndex: 'price',
      key: 'price'
    }
  ]
  return (
    <div>
      <Row type='flex' justify='space-between' align='middle' style={{ marginBottom: 8 }}>
        <JcDisplayItem label='商品内容' />
        {/* {mode === 'edit' && <Button type='primary'>新增</Button>} */}
      </Row>
      <div style={{ background: '#F8F8F9', padding: 24 }}>
        {goodsContent &&
          goodsContent.map((content, i) => {
            let columns = []
            if (mode === 'view') {
              columns = baseColumns
            } else {
              columns = [
                ...baseColumns,
                {
                  title: '操作',
                  dataIndex: 'contentId',
                  key: 'contentId',
                  render: (contentId, record, index) =>
                    (
                      <span>
                        <a onClick={() => pricesShowModal(2, content.id, index)}>新增</a>
                        <Divider type='vertical' />
                        <a onClick={() => editShowModal(2, content.id, record)}>编辑</a>
                        <Divider type='vertical' />
                        {
                          content.list.length !== 1 &&
                          <a onClick={() => removeMenu(content.id, contentId)}>删除</a>
                        }
                      </span>
                    )
                }
              ]
            }

            return (
              <div key={i} style={{ marginBottom: 24, background: '#fff', padding: 24, position: 'relative' }}>
                {
                  mode === 'edit' && goodsContent.length !== 1 &&
                  <Icon
                    type='close-circle-o'
                    style={{ position: 'absolute', top: '-12px', fontSize: 24, right: '12px', cursor: 'pointer' }}
                    onClick={() => removeGoods(content.id)}
                  />
                }
                <Row type='flex' justify='space-between' align='middle' style={{ marginBottom: 8 }}>
                  <JcDisplayItem label='商品标题' mode={mode} text={content.title}>
                    {
                      <span>
                        {content.title}
                        <Icon
                          type='edit'
                          onClick={() => editShowModal(1, content.id, content)}
                          style={{ color: '#FD5729', marginLeft: 4 }}
                        />
                      </span>
                    }
                  </JcDisplayItem>
                  { mode === 'edit' && <Button onClick={() => pricesShowModal(1, content.id, i)}>新增</Button> }
                </Row>

                <Table size='middle' bordered={true} columns={columns} dataSource={content.list} pagination={false} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default JcCommoditySet
