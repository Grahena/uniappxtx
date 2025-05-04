import type { HotResult } from '@/types/hot';
import type { PageParams } from './../types/global.d';
import { http } from "@/utils/http"



type hotType = PageParams & {subType:string}
export const getHotRecommandApi = (url:string,data?:hotType)=>{
  return http<HotResult>({
    method:'GET',
    url,
    data
  })
}
