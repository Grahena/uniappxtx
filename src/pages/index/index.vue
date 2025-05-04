<script setup lang="ts">
import CustomNavBar from './components/CustomNavBar.vue'
import {getHomeBannerAPI,getHomeCategoryApi,getHomeHotApi} from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import {ref} from 'vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import XtxGuess from '@/components/XtxGuess.vue'
import type { XtxGuessInstance } from '@/components/components'

const bannerList = ref<BannerItem[]>([])
//获取轮播图
const getHomeBannerData = async() => {
  const res = await getHomeBannerAPI()
  //console.log('1'+res);
  bannerList.value = res.result
  //console.log(bannerList.value);

}
const categoryList = ref<CategoryItem[]>([])
//获取首页分类
const getHomeCategoryData = async()=>{
  const res = await getHomeCategoryApi()
  categoryList.value = res.result
}
//获取首页热门
const homeHotList = ref<HotItem[]>([])
const getHomeHotData =  async() =>{
  const res = await getHomeHotApi()
  homeHotList.value = res.result
  //console.log(homeHotList.value);

}
onLoad((options) => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
})
//加载更多
const guessRef = ref<InstanceType<typeof XtxGuess>>()
const triggered = ref(false)
const onscrolltolower= ()=>{
  guessRef.value?.getMore()
}

const onrefresher=async ()=>{
  triggered.value= true
  guessRef.value?.reset()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore()
  ])
  triggered.value = false
}
</script>

<template>
  <CustomNavBar/>
  <scroll-view @scrolltolower="onscrolltolower" class="scroll-view" scroll-y refresher-enabled @refresherrefresh="onrefresher" :refresher-triggered="triggered">
    <XtxSwiper :list="bannerList"/>
    <CategoryPanel :list="categoryList"/>
    <HotPanel :list="homeHotList"/>
    <XtxGuess ref="guessRef"/>
  </scroll-view>

</template>

<style lang="scss">
//
page{
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.srcoll-view{
  flex: 1;
}
</style>
