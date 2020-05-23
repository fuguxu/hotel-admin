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
              <el-col :span="24">
                <el-form-item label="销售规格">
                  <el-col :span="12">
                    <div :class="$style.tip">请合理填写销售规格</div>
                  </el-col>
                  <el-col class="text-right" :span="12">
                    <el-button type="primary" @click="multiFull" >批量填充</el-button>
                  </el-col>
                  <m-table :data="tableData" :columns="columns"
                    :showOperation="false" :showPagination="false"
                    >
                      <template v-for="(item, index) in skuColumns" v-slot:[`col-header-${item.prop}`]>
                        <el-select :key="index" :placeholder="item.label">
                          <el-option v-for="it in item.attributeValueList" :key="it.value" v-bind="it"></el-option>
                        </el-select>
                      </template>
                      <template v-slot:col-header-salePrice>
                        <el-input placeholder="价格(元)" />
                      </template>
                      <template v-slot:col-header-stockAmount>
                        <el-input placeholder="数量(件)" />
                      </template>
                  </m-table>
                </el-form-item>
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
      brandOptions: [],
      commonColumns: [
        {
          label: '价格',
          prop: 'salePrice',
          type: 'slot'
        },
        {
          label: '数量',
          prop: 'stockAmount',
          type: 'slot'
        }
      ],
      tableRow: {
        salePrice: '',
        stockAmount: '',
        costPrice: '',
        originalPrice: '',
        skuValue: []
      },
      skuColumns: [],
      tableData: []
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
            attributeValueList: (item.attributeValueList || []).map(it => {
              return {
                value: it,
                label: it
              }
            }),
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
            skuConfId: item.id,
            attributeValueList: (item.attributeValueList || []).map(it => {
              return {
                value: it,
                label: it
              }
            }),
            elementType: item.elementType,
            attributeName: item.attributeName
          }
        })
        this.renderColumns()
      }
    },
    renderColumns () {
      this.skuColumns = this.formBase.skuValues.map(item => {
        return {
          label: item.attributeName,
          prop: item.attributeName,
          type: 'slot',
          attributeValueList: item.attributeValueList
        }
      })
    },
    renderData () {
      let skus = []
      skus = this.formBase.skuValues.reduce((pre, cur) => {
        let ret = []
        pre.forEach(t => {
          cur.attributeValue.forEach(it => {
            ret.push(t.concat([{ [cur.attributeName]: it, skuValue: [{ attributeName: cur.attributeName, attributeValue: it, productId: cur.productId, skuConfId: cur.skuConfId }] }]))
          })
        })
        return ret
      }, [[]])
      console.log(skus)
      this.tableData = skus.reduce((pre, cur) => {
        let obj = {}
        let skuValue = []
        cur.forEach(item => {
          obj = { ...obj, ...item, skuValue: skuValue.concat(item.skuValue) }
        })
        obj = { ...this.tableRow, ...obj }
        return pre.concat([obj])
      }, [])
      console.log(this.tableData)
    },
    multiFull () {
      console.log(this.formBase)
      this.renderData()
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
    },
    columns () {
      return this.skuColumns.concat(this.commonColumns)
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
