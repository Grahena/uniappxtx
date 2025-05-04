
// 商品详情
// GET

import type { GoodsResult } from "@/types/good"
import { http } from "@/utils/http"

// /goods
export const getgoodsByidApi =  (id:string)=>{
    return http<GoodsResult>({
        method:'GET',
        url:'/goods',
        data:{id}
    })
}
