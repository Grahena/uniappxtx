// 添加收货地址
// POST
// /member/address

import type { AddressItem, AddressParams } from "@/types/address"
import { http } from "@/utils/http"

export const postMemberAddressApi = (data:AddressParams) =>{
  return http({
    method:'POST',
    url:'/member/address',
    data
  })
}

// 获取收货地址列表
// GET
// /member/address
export const getMemberAddressApi = ()=>{
  return http<AddressItem[]>({
    method:'GET',
    url:'/member/address'
  })
}

// 获取收货地址详情
// GET
// /member/address/{id}
export const getMemberAddressByIdApi = (id:string)=>{
  return http<AddressItem>({
    method:'GET',
    url:`/member/address/${id}`
  })
}

// 修改收货地址
// PUT
// /member/address/{id}
export const putMemberAddressById = (id:string,data:AddressParams) => {
  return http({
    method:'PUT',
    url:`/member/address/${id}`,
    data
  })
}

// 删除收货地址详情
// delete
// /member/address/{id}
export const deleteMemberAddressByIdApi = (id:string)=>{
  return http<AddressItem>({
    method:'DELETE',
    url:`/member/address/${id}`
  })
}
