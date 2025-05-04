import { useMemberStore } from "@/stores"

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInterceptor = {
  invoke(options:UniApp.RequestOptions){
    //非http开头拼接地址
    if(!options.url.startsWith('http')){
      options.url = baseURL + options.url
    }
    //请求超时
    options.timeout = 10000
    //添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp'
    }
    //添加token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  }
}

uni.addInterceptor('request',httpInterceptor)
uni.addInterceptor('uploadFile',httpInterceptor)

//请求函数-请求成功
interface Data<T>{
  code : string
  msg : string
  result : T
}

export const http = <T>(options:UniApp.RequestOptions)=>{
  return new Promise<Data<T>>((resolve,reject)=>{
    uni.request({
      ...options,
      success(res){
        //2XX响应
        if(res.statusCode >= 200 && res.statusCode <300){
          resolve(res.data as Data<T>)
        }//未登录
        else if(res.statusCode === 401){
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({url: '/pages/login/login'})
          reject(res)
        }//其他错误
        else{
          uni.showToast({
            icon:'none',
            title:(res.data as Data<T>).msg || '获取失败',
          })
          reject(res)
        }

      },
      fail(err){
        uni.showToast({
          icon:'none',
          title:'网络错误',
        })
        reject(err)
      }
    })
  })
}
