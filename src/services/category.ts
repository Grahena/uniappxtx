// 分类列表-小程序
// GET

import type { CategoryTopItem } from "@/types/category"
import { http } from "@/utils/http"

// /category/top
export const getCategoryApi = () => {
  return http<CategoryTopItem[]>({
    method:'GET',
    url:'/category/top'
  })
}
