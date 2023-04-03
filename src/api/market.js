import request from "@/utils/request";

const base = "/admin";

// 省份（有id时代表请求省下的市）
export function provinceCityArea(id = "") {
  return request({
    url: "/api/v1/provinceCityArea/" + id,
  });
}
// 市场经营类型
export function marketType() {
  return request({
    url: base + "/v1/search_operation",
  });
}

// 市场列表接口
export function searchMarket() {
  return request({
    url: base + "/v1/search_market",
  });
}

// 市场表格数据
export function marketList(params) {
  return request({
    url: base + "/v1/market_list",
    params,
  });
}

// 添加修改市场
export function marketInfoadd(data) {
  return request({
    url: base + "/v1/market_infoadd",
    data,
    method: "post",
  });
}

// 市场详情
export function getMarketAddpage(params) {
  return request({
    url: base + "/v1/market_addpage",
    params,
  });
}
// 市场列表接口
export function getSearchMarket(params) {
  return request({
    url: base + "/v1/search_market",
    params,
  });
}
//市场分区列表
export function marketSegmentationList(params) {
  return request({
    url: base + "/v1/market_segmentation_list",
    params,
  });
}
// 市场分区页面（添加或者修改）的提交
export function marketSegmentationSubmit(data) {
  return request({
    url: base + "/v1/market_segmentation_submit",
    data,
    method: "post",
  });
}
//  岗位筛选
export function searchStation() {
  return request({
    url: base + "/v1/search_station",
  });
}
//  市场人员列表
export function marketManageList(params) {
  return request({
    url: base + "/v1/market_manage_list",
    params,
  });
}
// 文化程度数据 岗位数据 市场数据
export function marketManagePage() {
  return request({
    url: base + "/v1/market_manage_page",
  });
}

// 市场管理人员添加提交
export function marketManageAdd(data) {
  return request({
    url: base + "/v1/market_manage_add",
    method: "post",
    data,
  });
}

// 市场管理人员详情
export function marketManageModify(params) {
  return request({
    url: base + "/v1/market_manage_modify",
    params,
  });
}
// 市场管理人员修改提交
export function marketManageUpdate(params) {
  return request({
    url: base + "/v1/market_manage_update",
    params,
  });
}
// 设施 管理列表
export function userService(params) {
  return request({
    url: base + "/v1/user_service",
    params,
  });
}
// 设施管理修改
export function putUserService(data, id) {
  return request({
    url: base + "/v1/user_service/" + id,
    method: "put",
    data,
  });
}
// 市场排名列表
export function marketRanking(params) {
  return request({
    url: base + "/v1/market_ranking",
    params,
  });
}
// 市场排名新增
export function postMarketRanking(data) {
  return request({
    url: base + "/v1/market_ranking",
    data,
    method: "post",
  });
}
// 市场排名修改
export function putMarketRanking(data, id) {
  return request({
    url: base + "/v1/market_ranking/" + id,
    data,
    method: "put",
  });
}
// 摊位列表
export function boothList(params) {
  return request({
    url: base + "/v1/booth_list",
    params,
  });
}
// 摊位类型
export function searchBoothYype() {
  return request({
    url: base + "/v1/search_booth_type",
  });
}
// 经营状态
export function searchForms() {
  return request({
    url: base + "/v1/search_forms",
  });
}
// 摊位添加/修改 提交
export function boothSubmit(data) {
  return request({
    url: base + "/v1/booth_submit",
    data,
    method: "post",
  });
}
// 分区
export function searchSegmentation(params) {
  return request({
    url: base + "/v1/search_segmentation",
    params,
  });
}

// 经营户基本信息管理
export function sellerList(params) {
  return request({
    url: base + "/v1/seller_list",
    params,
  });
}
// 商户添加/修改 提交
export function sellerSubmit(params) {
  return request({
    url: base + "/v1/seller_submit",
    params,
  });
}
