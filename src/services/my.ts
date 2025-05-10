// 获取个人信息
// GET
// /member/profile

import type { ProfileChange, ProfileDetail } from "@/types/login"
import { http } from "@/utils/http"

export const getMyProfileApi = ()=>{
  return http<ProfileDetail>({
    method:'GET',
    url:'/member/profile'
  })
}

// 修改个人信息
// PUT
// /member/profile
export const putMemberProfileApi = (data:ProfileChange) =>{
  return http<ProfileChange>({
    method:'PUT',
    url:'/member/profile',
    data
  })
}
