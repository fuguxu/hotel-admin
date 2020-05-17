<template>
  <section class="product_detail">
    <div :class="$style['tab-info']">
      <a :class="$style['tab-info-item']" href="" v-for="item in tabs" :key="item.name">{{item.name}}</a>
    </div>
    <div :class="$style['select-product']">
      <span>当前分类：</span>
      <span>酒店同款 > 被子</span>
    </div>
    <div :class="$style.content">
      <div :class="$style.header">
        基本信息
      </div>
      <div>
        <el-form :inline="true" :model="formBase" class="demo-form-inline">
          <el-form-item label="商品类型">
            <el-input v-model="formBase.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商品标题">
            <el-input v-model="formBase.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input v-model="formBase.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商品品牌">
            <el-select v-model="formBase.region" placeholder="请选择">
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>
<script>
// import { saveUserLevel, getUserLevelById } from '@/service/service.js'
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

      }
    }
  },
  methods: {
  },
  created () {
  },
  computed: {
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
    }
  }
</style>
