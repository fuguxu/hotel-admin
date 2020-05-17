<template>
  <section class="product_detail">
    <div :class="$style['tab-info']">
      <a :class="$style['tab-info-item']"  v-for="item in tabs" :key="item.name">{{item.name}}</a>
    </div>
    <div :class="$style['select-product']">
      <span>当前分类：</span>
      <span>{{pathLabels}}</span>
    </div>
    <div :class="$style.content">
      <div :class="$style.header">
        基本信息
      </div>
      <el-row class="mt-10" >
        <el-col :span="12">
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
          </el-form>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
import { getProductBrand } from '@/service/service.js'
import { storeTypeOptions } from '@/pages/MarketManage/config.json.js'
export default {
  data () {
    return {
      tabs: [
        {
          name: '基础信息',
          herf: ''
        },
        {
          name: '销售信息',
          herf: ''
        },
        {
          name: '图文描述',
          herf: ''
        }
      ],
      formBase: {
        type: '',
        productName: '',
        productProfile: '',
        brandId: ''
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
    }
  },
  created () {
    this.getProductBrand()
  },
  computed: {
    pathLabels () {
      return (this.$route.query.path || '').replace(/x/g, ' > ')
    }
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
</style>
