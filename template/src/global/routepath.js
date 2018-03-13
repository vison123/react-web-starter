const BASE_URL = `/app`

export const HOME = BASE_URL
export const LOGIN = `${HOME}/login`
export const ORDER_LIST = `${HOME}/order/list`
export const ORDER_LIST_TAKEOUT = `${HOME}/order/list/takeout`
export const ORDER_LIST_EBOOKING = `${HOME}/order/list/ebooking`
export const ORDER_LIST_GROUP = `${HOME}/order/list/group`
export const ORDER_DETAIL = `${HOME}/order/listdetail` // 订单详情
export const EBOOKING_ORDER_DETAIL = `${HOME}/order/ebookingdetail` // 电商订单详情
export const TAKEOUT_ORDER_DETAIL = `${HOME}/order/takeoutdetail` // 外卖订单详情
export const GROUP_ORDER_DETAIL = `${HOME}/order/groupdetail` // 外卖订单详情

export const ORDER_MANAGE = `${HOME}/order/mealManage` // 点餐订单
export const ORDER_MANAGE_DETAIL = `${HOME}/order/mealManageDetail` // 点餐订单详情

export const VERIFY_TICKET = `${HOME}/verify/ticket` // 核销管理 - 票务核销
export const VERIFY_GROUP = `${HOME}/verify/group` // 核销管理 - 团购核销
export const ORDER_TICKET_ORDER = `${HOME}/order/ticketorder`
export const ORDER_TICKET_DETAIL = `${HOME}/order/ticketorderDetails`

// 旅游订单
export const ORDER_TRAVEL_ORDER = `${HOME}/order/travelorder` // 旅游订单
export const ORDER_TRAVEL_DETAIL = `${HOME}/order/traveldetail` // 旅游订单 - 旅游订单详情
export const VERIFY_TRAVEL = `${HOME}/verify/travel` // 核销管理 - 旅游核销

// 退款
export const AFTER_SALE_REFUND = `${HOME}/aftersale/refund`
export const REFUND_DETAIL = `${HOME}/refund/refunddetail`

// 点餐商品管理
export const COMMODITY_MEAL = `${HOME}/commodity/meal` // 点餐 模块
export const MEAL_LIST = `${COMMODITY_MEAL}/list` // 点餐列表
export const ORDER_MEAL_EXPORT = `/api/system/order/export` // 点餐列表
export const MEAL_DETAIL_ADD = `${COMMODITY_MEAL}/detail/add` // 点餐 详情
export const MEAL_DETAIL_EDIT = `${COMMODITY_MEAL}/detail/edit` // 点餐 详情
export const MEAL_CLASS = `${COMMODITY_MEAL}/class` // 点餐 分类管理
export const MEAL_DESK = `${COMMODITY_MEAL}/desk` // 点餐 桌位管理

// 订单打印
export const PENDING_DELIVERY_ORDER = `${HOME}/order/print`
export const BATCH_PRINT_LIST = `${HOME}/order/batchprint`

// 商品管理
export const EBOOKING_COMMODITY_LIST = `${HOME}/commodity/ebooking` // 电商商品管理
export const EBOOKING_COMMODITY_DETAIL = `${HOME}/commodity/ebookingdetail` // 电商商品管理 详情

export const TICKET_SHOPLIST = `${HOME}/commodity/ticket` // 票务商品管理
export const TICKET_SHOPLIST_DETAIL = `${HOME}/commodity/ticketdetail` // 票务商品管理 编辑

export const TRAVEL_SHOPLIST = `${HOME}/commodity/travel` // 旅游商品管理
export const TRAVEL_SHOPLIST_DETAIL = `${HOME}/commodity/traveldetail` // 旅游商品管理 详情

export const GROUP_SHOPLIST = `${HOME}/commodity/group`  // 团购商品管理
export const GROUP_SHOPLIST_DETAIL = `${HOME}/commodity/groupdetail` // 团购商品管理 详情

export const TAKETOUT_SHOPLIST = `${HOME}/commodity/taketout` // 外卖商品管理
export const TAKET_SHOPLIST_DETAIL = `${HOME}/commodity/taketdetail` // 外卖商品管理 详情

// 我的店铺
export const MY_SHOPS = `${HOME}/myShops/list` // 我的店铺
export const SHOP_DETAIL = `${HOME}/myShops/detail` // 店铺信息
