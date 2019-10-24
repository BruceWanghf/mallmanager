//插件模块
import axios from 'axios'
const MyHttpServer = {}

MyHttpServer.install = (Vue) => { 
    // 添加实例方法
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    // 通过axios请求拦截器统一设置请求头
    // const AUTH_TOKEN = localStorage.getItem("token")
    // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if(config.url!==`login`){
            const AUTH_TOKEN = localStorage.getItem("token")
            config.headers["Authorization"] = AUTH_TOKEN
        }
        return config;
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });


    Vue.prototype.$http = axios
}
export default MyHttpServer