import request from "@/utils/request";

// 上传照片
export function uploads(data) {
  return request({
    url: "/api/v1/uploads",
    data,
    method: "post",
  });
}
