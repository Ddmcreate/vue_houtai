// 封装axios
import axios from 'axios'

const http =axios.create({
    // 请求同用地址
    baseURL:"/api",
    timeout:10000 //超时事件
})

// 添加请求拦截器
http.interceptors.request.use(function(config){
    // 在请求发送之前做些什么
    return config
},function(error){
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加拦截响应
http.interceptors.response.use(function(response){
    // 对响应数据做些什么
    return response
},function(error){
    // 对响应的错误做些什么
    return Promise.reject(error)
})

//将其暴露出去
export default http