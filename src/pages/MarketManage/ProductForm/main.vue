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
                <asyncFormItem @change="changeSku" :label="item.attributeName" multiple :attributeValueList="item.attributeValueList" :elementType="item.elementType" v-model="item.attributeValue">
                  <template slot="tip">
                    <div :class="$style.tip">请选择或输入{{item.attributeName}}，增加搜索或导购机会</div>
                  </template>
                </asyncFormItem>
              </el-col>
              <el-col :span="24">
                <el-form-item label="销售规格">
                  <el-row>
                    <el-col :span="12">
                      <div :class="$style.tip">请合理填写销售规格</div>
                    </el-col>
                    <el-col class="text-right" :span="12">
                      <el-button type="primary" @click="multiFull" >批量填充</el-button>
                    </el-col>
                  </el-row>
                  <m-table class="mt-10" :data="tableData" :columns="columns"
                    :showOperation="false" :showPagination="false"
                    >
                      <template v-for="(item) in columns" v-slot:[`col-header-${item.prop}`]>
                        <el-select v-if="item.attributeValueList" :key="item.prop" :placeholder="item.label">
                          <el-option v-for="it in item.attributeValueList" :key="it.value" v-bind="it"></el-option>
                        </el-select>
                        <el-input v-else :key="item.prop"  v-model="item.colValue" :placeholder="item.placeholder" />
                      </template>
                      <template v-for="(item) in commonColumns" v-slot:[`col-${item.prop}`]="{scope}">
                        <el-input :key="item.prop" v-model="scope.row[item.prop]" />
                      </template>
                  </m-table>
                </el-form-item>
              </el-col>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div :class="$style.content">
      <div id="desc" :class="$style.header">图文描述</div>
      <el-row class="mt-10">
        <el-col :span="24">
          <el-form  :model="formBase" label-width="86px" >
            <el-form-item label="商品图片">
              <div :class="$style.tip">商品图片不能超过3m，建议700*700的图片</div>
              <div :class="$style.pictures">
                <div :class="$style['pic-item']">
                  <div v-if="!formBase.mainPictureUrl" :class="$style['pic-tip']">宝贝主图</div>
                  <m-upload v-model="formBase.mainPictureUrl" tipText="添加上传图片" dir="product/detail"></m-upload>
                </div>
                <div :class="$style['pic-item']" v-for="(item, index) in formBase.subImage" :key="index">
                  <div v-if="!item.imageUrl" :class="$style['pic-tip']">宝贝白底图</div>
                  <m-upload  v-model="item.imageUrl" tipText="添加上传图片" dir="product/detail"></m-upload>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="图文详情">
              <div :class="$style.tip">图文详情有助与买家更好了解商品</div>
              <el-col :span="20">
                <editor dir="product/detail" v-model="formBase.detail.detailInfo"></editor>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div :class="$style.footer">
      <el-button @click="submit" type="primary">提交</el-button>
      <el-button >返回</el-button>
    </div>
  </section>
</template>
<script>
import { getProductBrand, getConfSpuByCategroy, getConfSkuByCategroy, saveProductInfo, getProductById, getSpuValue, getSkuValue } from '@/service/service.js'
import { storeTypeOptions } from '@/pages/MarketManage/config.json.js'
import asyncFormItem from '@/pages/Components/asyncFormItem/main'
import editor from '@/pages/Components/editor/main'
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
        categortName: '',
        productProfile: '',
        brandId: '',
        mainPictureUrl: '',
        subImage: Array.from({ length: 4 }).map(item => {
          return {
            imageUrl: ''
          }
        }),
        detail: {
          detailInfo: ''
        },
        spuValues: [],
        // skuItemValues: [],
        skuValues: []
      },
      storeTypeOptions: storeTypeOptions,
      brandOptions: [],
      commonColumns: [
        {
          label: '成本价',
          prop: 'costPrice',
          placeholder: '成本价(元)',
          colValue: '',
          type: 'slot'
        },
        {
          label: '原价',
          prop: 'originalPrice',
          placeholder: '原价(元)',
          colValue: '',
          type: 'slot'
        },
        {
          label: '销售价',
          prop: 'salePrice',
          placeholder: '销售价(元)',
          colValue: '',
          type: 'slot'
        },
        {
          label: '数量',
          prop: 'stockAmount',
          placeholder: '数量(件)',
          colValue: '',
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
      return this.brandOptions
    },
    async getConfSpuByCategroy (categoryId) {
      let res = await getConfSpuByCategroy({ categoryId: categoryId || this.categoryId })
      if (res.code === 200) {
        this.formBase.spuValues = (res.data || []).map(item => {
          return {
            attributeValue: '',
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
      return this.formBase.spuValues
    },
    async getConfSkuByCategroy (categoryId) {
      let res = await getConfSkuByCategroy({ categoryId: categoryId || this.categoryId })
      if (res.code === 200) {
        this.formBase.skuValues = (res.data || []).map(item => {
          return {
            attributeValue: [],
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
      return this.formBase.skuValues
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
            ret.push(t.concat([{ [cur.attributeName]: it, skuValue: [{ attributeName: cur.attributeName, attributeValue: it, skuConfId: cur.skuConfId }] }]))
          })
        })
        return ret
      }, [[]])
      let tableData = skus.reduce((pre, cur) => {
        let obj = {}
        let skuObj = {}
        let skuValues = []
        cur.forEach(item => {
          const { skuValue, ...rest } = item
          skuValues = skuValues.concat(skuValue)
          obj = { ...obj, ...rest }
        })
        skuValues.forEach(it => {
          skuObj[it.attributeName] = it.attributeValue
        })
        obj = { ...this.tableRow, ...obj, skuValue: skuValues, skuInfo: JSON.stringify(skuObj) }
        return pre.concat([obj])
      }, [])
      this.handlerTableData(tableData)
      console.log([...this.tableData])
    },
    handlerTableData (data) {
      let tableData = this.tableData
      let newTableData = data.map(n => {
        tableData.forEach(o => {
          if (n.skuInfo === o.skuInfo) {
            n = o
          }
        })
        return n
      })
      this.tableData = newTableData
    },
    changeSku () {
      this.renderData()
    },
    multiFull () {
      const dataColumns = this.commonColumns.filter(item => {
        return item.colValue
      })
      if (dataColumns.length === 0) return
      this.tableData.forEach(item => {
        dataColumns.forEach(col => {
          item[col.prop] = col.colValue
        })
      })
    },
    async submit () {
      this.formBase.skuItemValues = this.tableData
      this.formBase.categoryId = this.categoryId
      const res = await saveProductInfo(this.formBase)
      this.$handleRequestTip(res)
      res.code === 200 && this.$router.push({ path: '/h/product_manage' })
    },
    linkToTab (selector) {
      const el = document.querySelector(`#${selector}`)
      el && el.scrollIntoView()
    },
    async getProductById () {
      const res = await getProductById({
        id: this.id
      })
      return res.data
    },
    async getSpuValue () {
      const res = await getSpuValue({
        id: this.id
      })
      return res.data
    },
    async getSkuValue () {
      const res = await getSkuValue({
        id: this.id
      })
      return res.data || {}
    },
    setBaseForm (formData) {
      this.formBase.id = formData.id
      this.formBase.detailId = formData.detailId
      this.formBase.type = formData.type
      this.formBase.productName = formData.productName
      this.formBase.productProfile = formData.productProfile
      this.formBase.brandId = formData.brandId
      this.formBase.mainPictureUrl = formData.mainPictureUrl
      this.formBase.detail = formData.detail
      this.formBase.categortName = formData.categortName
      this.formBase.subImage = formData.subImage || this.formBase.subImage
    },
    setSpuValue (spuValue) {
      this.formBase.spuValues.map(item => {
        spuValue.forEach(it => {
          if (item.spuConfId === it.spuConfId) {
            item.attributeValue = it.attributeValue
            item.id = it.id
          }
        })
      })
    },
    setSkuValue (skuValue = []) {
      this.formBase.skuValues.map(item => {
        skuValue.map(it => {
          if (item.attributeName === it.attributeName) {
            item.id = it.id
            item.attributeValue = Array.from(new Set(it.selectValueList || []))
          }
        })
      })
      // this.renderData()
    },
    setTableData (skuItemValue = []) {
      this.tableData = skuItemValue.map(item => {
        item = { ...item, ...JSON.parse(item.skuInfo) }
        return item
      })
      console.log([...this.tableData])
    },
    async setFormData (arg) {
      const [formData, spuValue, skuValue] = arg
      await this.getProductData(formData.categoryId)
      this.setBaseForm(formData)
      this.setSpuValue(spuValue)
      this.setSkuValue(skuValue.selectSkuValue)
      this.setTableData(skuValue.skuItemValue)
    },
    async getProductData (categoryId) {
      return Promise.all([this.getProductBrand(), this.getConfSpuByCategroy(categoryId), this.getConfSkuByCategroy(categoryId)])
    },
    async initData () {
      if (this.categoryId) {
        this.getProductData()
      } else {
        Promise.all([this.getProductById(), this.getSpuValue(), this.getSkuValue()]).then(this.setFormData)
      }
    }
  },
  created () {
    this.initData()
  },
  computed: {
    pathLabels () {
      return (this.$route.query.path || '').replace(/x/g, ' > ') || this.formBase.categortName
    },
    categoryId () {
      return this.$route.query.categoryId || this.formBase.categoryId
    },
    id () {
      return this.$route.query.id
    },
    columns () {
      return this.skuColumns.concat(this.commonColumns)
    }
  },
  components: {
    asyncFormItem,
    editor
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
  .pictures{
    display: flex;
    flex-wrap: wrap;
  }
  .pic-item{
    position: relative;
    margin-right: 10px;
  }
  .pic-tip{
    position: absolute;
    line-height: 20px;
    top:0;
    left:0;
    color:#fff;
    width:100%;
    z-index: 100;
    text-align: center;
    background-color: #C0C4CC;
    font-size: 12px;
  }
  .footer{
    text-align: center;
    padding: 20px 0px;
  }
</style>
<style scoped>
  .product_detail >>> .el-upload-dragger{
    width:150px;
    height:150px;
  }
</style>
