<script setup lang="ts">
import { getMemberAddressByIdApi, postMemberAddressApi, putMemberAddressById } from '@/services/address';
import { onLoad } from '@dcloudio/uni-app';
import type { UniFormsInstance } from '@uni-helper/uni-ui-types';
import { ref } from 'vue'

// 表单数据
const form = ref({
  receiver: '', // 收货人
  contact: '', // 联系方式
  fullLocation: '', // 省市区(前端展示)
  provinceCode: '', // 省份编码(后端参数)
  cityCode: '', // 城市编码(后端参数)
  countyCode: '', // 区/县编码(后端参数)
  address: '', // 详细地址
  isDefault: 0, // 默认地址，1为是，0为否
})

const query = defineProps<{
  id?: string
}>()
//编辑回显
const getAddressDetail = async () => {
  if (query.id) {
    const res = await getMemberAddressByIdApi(query.id)
    Object.assign(form.value, res.result)
  }
}
onLoad(() => {
  getAddressDetail()
})
uni.setNavigationBarTitle({
  title: query.id ? '编辑地址' : '新增地址',
})
const onRegionChange: UniHelper.RegionPickerOnChange = (event) => {
  form.value.fullLocation = event.detail.value.join(" ")
  const [provinceCode, cityCode, countyCode] = event.detail.code!
  Object.assign(form.value, { provinceCode, cityCode, countyCode })

}
const onSwitchChange: UniHelper.SwitchOnChange = (event) => {
  form.value.isDefault = event.detail.value ? 1 : 0
}
const formRef = ref<UniFormsInstance>()
const submit = async () => {
  try {
    formRef.value?.validate?.()
    if (query.id) {
      await putMemberAddressById(query.id, form.value)
    } else {
      await postMemberAddressApi(form.value)
    }


    uni.showToast({
      icon: 'none',
      title: query.id ? '修改成功' : '保存成功'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  } catch (error) {
    uni.showToast({
      icon: 'error',
      title: '填写完整'
    })
  }

}
const rules: UniHelper.UniFormsRules = {
  name: {
    rules: [{
      required: true,
      errorMessage: '请输入姓名'
    }]
  }
}
</script>

<template>
  <view class="content">
    <uni-forms ref="formRef" :model="form" :rules="rules">
      <!-- 表单内容 -->
      <uni-forms-item class="form-item" name="name">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item class="form-item">
        <text class="label">手机号码</text>
        <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
      </uni-forms-item>
      <uni-forms-item class="form-item">
        <text class="label">所在地区</text>
        <picker @change="onRegionChange" class="picker" mode="region" :value="form.fullLocation">
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch class="switch" color="#27ba9b" :checked="form.isDefault == 1" @change="onSwitchChange" />
      </view>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button class="button" @tap="submit">保存并使用</button>

</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
