import axios from "axios";
import { AJAX_STATUS } from "@/constant/index";
import { Message } from "element-ui";

const request = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  timeout: 10000,
  withCredentials: true, // 跨域设置
  crossDomain: true,
});

// request拦截器，挂cookies里面的auth～
request.interceptors.request.use((config) => {
  console.log("ajax 请求设置");
  const method = config.method;
  const apiKey = process.env.VUE_APP_API_KEY; //追加的参数
  // console.log(process.env);
  // config.headers["X-Authorization"] = apiKey; // 假设还需要token
  // config.headers["Content-Type"] = "application/json";
  switch (method) {
    // case "put":
    // case "delete":
    // case "post":
    //...config.data 需要处理这个
    case "get":
      config.params = {
        apiKey,
        ...config.params,
      };
      break;
    default:
      break;
  }
  // 添加参数
  return config;
});

// response 拦截器
request.interceptors.response.use(
  (response) => {
    let res = response.data;
    if (res.status === AJAX_STATUS.ok) {
      return res;
    } else {
      switch (res.status) {
        // 这里直接mock用default处理
        case AJAX_STATUS.error:
        default:
          Message({
            message: `网络有一些问题，请稍后重试或使用错误码: ${res.status} 联系管理员`,
            type: "error",
            duration: 5 * 1000,
          });
          break;
      }
    }
  },
  (error) => {
    Message({
      message: "网络错误",
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
export default request;
