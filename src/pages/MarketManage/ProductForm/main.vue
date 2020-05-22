<template>
  <section class="product_detail">
    <div :class="$style['tab-info']">
      <a :class="$style['tab-info-item']" @click="linkToTab(item.herf)" v-for="item in tabs" :key="item.name">{{item.name}}</a>
    </div>
    <div :class="$style['select-product']">
      <span>当前分类：</span>
      <span>{{pathLabels}}</span>
    </div>
    <div :class="$style.content">
      <div id="base" :class="$style.header">基本信息</div>
      <el-row class="mt-10" >
        <el-col :span="20">
          <el-form  :model="formBase" label-width="86px" >
            <el-form-item label="商品类型">
              <el-radio-group v-model="formBase.type">
                <el-radio v-for="item in storeTypeOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-col :span="12">
              <el-form-item label="商品标题">
                <el-input v-model="formBase.productName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品简介">
                <el-input v-model="formBase.productProfile" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品品牌">
                <el-select v-model="formBase.brandId" filterable remote :remote-method="getProductBrand" @clear="getProductBrand" clearable placeholder="请选择">
                  <el-option v-for="item in brandOptions" :key="item.id" :label="item.brandName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="商品属性">
                <div :class="$style.tip">为您更好的销售，请认真准确填写商品属性</div>
                <div class="clearfloat" :class="$style['property-wrap']" v-if="formBase.spuValues.length">
                  <el-col :span="12" v-for="(item, index) in formBase.spuValues" :key="index">
                    <asyncFormItem label-width="120px" :label="item.attributeName" :attributeValueList="item.attributeValueList" :elementType="item.elementType" v-model="item.attributeValue"></asyncFormItem>
                  </el-col>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div :class="$style.content">
      <div id="sale" :class="$style.header">销售信息</div>
      <el-row class="mt-10" >
        <el-col :span="20">
          <el-form  :model="formBase" label-width="86px" >
            <div class="clearfloat" v-if="formBase.skuValues.length">
              <el-col :span="18" v-for="(item, index) in formBase.skuValues" :key="index">
                <asyncFormItem :label="item.attributeName" multiple :attributeValueList="item.attributeValueList" :elementType="item.elementType" v-model="item.attributeValue">
                  <template slot="tip">
                    <div :class="$style.tip">请选择或输入{{item.attributeName}}，增加搜索或导购机会</div>
                  </template>
                </asyncFormItem>
              </el-col>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
import { getProductBrand, getConfSpuByCategroy, getConfSkuByCategroy } from '@/service/service.js'
import { storeTypeOptions } from '@/pages/MarketManage/config.json.js'
import asyncFormItem from '@/pages/Components/asyncFormItem/main'
export default {
  data () {
    return {
      tabs: [
        {
          name: '基础信息',
          herf: 'base'
        },
        {
          name: '销售信息',
          herf: 'sale'
        },
        {
          name: '图文描述',
          herf: 'desc'
        }
      ],
      formBase: {
        type: '',
        productName: '',
        productProfile: '',
        brandId: '',
        spuValues: [],
        skuValues: [],
        skuItemValues: []
      },
      storeTypeOptions: storeTypeOptions,
      brandOptions: []
    }
  },
  methods: {
    async getProductBrand (name) {
      let res = await getProductBrand({
        brandName: name
      })
      if (res.code === 200) {
        this.brandOptions = (res.data ? res.data.records : [])
      }
    },
    async getConfSpuByCategroy () {
      let res = await getConfSpuByCategroy({ categoryId: this.categoryId })
      if (res.code === 200) {
        this.formBase.spuValues = (res.data || []).map(item => {
          return {
            attributeValue: '',
            productId: item.categoryId,
            spuConfId: item.id,
            attributeValueList: item.attributeValueList || [],
            elementType: item.elementType,
            attributeName: item.attributeName
          }
        })
      }
    },
    async getConfSkuByCategroy () {
      let res = await getConfSkuByCategroy({ categoryId: this.categoryId })
      if (res.code === 200) {
        this.formBase.skuValues = (res.data || []).map(item => {
          return {
            attributeValue: [],
            productId: item.categoryId,
            spuConfId: item.id,
            attributeValueList: item.attributeValueList || [],
            elementType: item.elementType,
            attributeName: item.attributeName
          }
        })
      }
    },
    linkToTab (selector) {
      const el = document.querySelector(`#${selector}`)
      el && el.scrollIntoView()
    }
  },
  created () {
    this.getProductBrand()
    this.getConfSpuByCategroy()
    this.getConfSkuByCategroy()
  },
  computed: {
    pathLabels () {
      return (this.$route.query.path || '').replace(/x/g, ' > ')
    },
    categoryId () {
      return this.$route.query.id
    }
  },
  components: {
    asyncFormItem
  }
}
</script>

<style lang="scss" module>
  $border-color:#E4E7ED;
  @mixin border {
    border:1px solid $border-color;
  }
  @mixin height {
    line-height: 40px;
    height: 40px;
    box-sizing: border-box;
  }
  .select-product,.tab-info{
    @include border;
    @include height;
    padding-left:20px;
  }
  .select-product {
    margin-top: 20px;
  }
  .tab-info{
    background-color: #F5F7FA;
    &-item{
      font-size: 14px;
      margin-right: 30px;
    }
  }
  .content{
    @include border;
    margin-top:20px;
    min-height: 400px;
    .header{
      @include height;
      border-bottom: 1px solid $border-color;
      padding-left:20px;
      font-size: 14px;
    }
  }
  .tip{
    font-size: 12px;
    color:gray;
  }
  .property-wrap {
    padding: 15px;
    background-color: #F5F7FA;
  }
</style>
