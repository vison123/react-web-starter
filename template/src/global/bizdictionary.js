const TicketOrderStatus = [
  {
    statusValue: '',
    statusName: '全部'
  },
  {
    statusValue: '10',
    statusName: '待付款'
  },
  {
    statusValue: '40',
    statusName: '已完成'
  },
  {
    statusValue: '50',
    statusName: '已取消'
  },
  {
    statusValue: '60',
    statusName: '已支付'
  },
]

const RefundStatus = [
  {
    key: '',
    value: '全部',
  },
  {
    key: '1',
    value: '退款中',
  },
  {
    key: '2',
    value: '退款成功',
  },
]

const GoodsUnit = [
  { unitValue: '包' },
  { unitValue: '份' },
  { unitValue: '个' },
  { unitValue: '瓶' },
  { unitValue: '盒' },
  { unitValue: '杯' },
  { unitValue: '袋' },
  { unitValue: '支' },
  { unitValue: '台' },
  { unitValue: '箱' },
  { unitValue: '件' }
]

const BusinessType = {
  Takeout: '1',
  Mall: '2',
  Group: '3',
  Ticket: '4',
  Travel: '6',
  Meal: '7',
}

const BizTypeDic = [
  {
    key: '1',
    value: '外卖'
  },
  {
    key: '2',
    value: '电商'
  },
  {
    key: '3',
    value: '团购'
  },
  {
    key: '4',
    value: '票务'
  },
  {
    key: '6',
    value: '旅游'
  },
  {
    key: '7',
    value: '点餐'
  },
]

const ProductTypes = [
  {
    key: '1',
    value: '实体商品'
  },
  {
    key: '2',
    value: '虚拟商品'
  }
]

const shelevesStatus = [
  {
    key: '',
    value: '全部',
  },
  {
    key: '1',
    value: '上架',
  },
  {
    key: '2',
    value: '下架',
  },
]

const OpenType = [
  {
    key: '1',
    value: '立即上架'
  },
  {
    key: '2',
    value: '定时上架'
  }
]

const YOrN = [
  {
    key: 'Y',
    value: '是'
  },
  {
    key: 'N',
    value: '否'
  }
]

const ExpressList = {
  'EXPRESS': '顺丰快递',
  'EXPRESS_ETO': '中通快递',
  'EXPRESS_ST': '申通快递',
  'EXPRESS_YT': '圆通快递',
  'EXPRESS_HT': '百世汇通',
  'EXPRESS_YD': '韵达速递',
  'EXPRESS_TT': '天天快递',
  'EXPRESS_EMS': 'EMS',
}

const PayStatus = {
  '1': '未支付',
  '2': '支付中',
  '3': '已支付',
  '4': '支付失败',
}

export {
  TicketOrderStatus,
  GoodsUnit,
  BusinessType,
  BizTypeDic,
  ProductTypes,
  OpenType,
  YOrN,
  RefundStatus,
  ExpressList,
  PayStatus,
  shelevesStatus,
}
