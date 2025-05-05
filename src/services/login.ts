// 小程序登录
// POST
// /login/wxMin

import type { LoginResult } from "@/types/login"
import { http } from "@/utils/http"

type loginData= {
  code:string,
  encryptedData:string,
  iv:string
}

const postLoginWxMinApi= (data:loginData)=>{
  return http({
    method:'POST',
    url:'/login/wxMin',
    data
  })
}
// 小程序登录-内测版
// POST
// /login/wxMin/simple
export const postLoginMNApi = (phoneNumber:string) => {
  return http<LoginResult>({
    method:'POST',
    url:'/login/wxMin/simple',
    data:{
      phoneNumber
    }
  })
}

