import request from "@/utils/request";

// 用户登录
export function login(data) {
  return request({
    url: "/admin/v1/authorizations",
    method: "post",
    data,
  });
}
// 登录信息
export function info() {
  return request({
    url: "/admin/v1/info",
  });
}
// 退出登录
export function logout() {
  return request({
    method: "delete",
    url: "/admin/v1/authorizations",
  });
}

// 图片验证码
export function captchas() {
  return request({
    method: "post",
    url: "api/v1/captchas",
  });
}
