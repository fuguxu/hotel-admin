<template>
  <section class="product_brand_detail">
    <el-row class="mt-10">
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-col :span="12">
             <el-form-item label="等级名称">
                <el-select v-model="form.levleCode" @change="changeLevelName"  filterable  clearable placeholder="请选择">
                  <el-option v-for="item in levleNameOptions" :key="item.levelCode" :value="item.levelCode" :label="item.levelName"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="等级图标">
              <img :src="form.levelIcon" alt="">
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="晋升类型">
                <el-select v-model="form.promotionType" @change="changePromotionType" filterable  clearable placeholder="请选择">
                  <el-option v-for="item in promotionTypeOptions" :key="item.id" :value="item.promotionType" :label="item.promotionTypeName"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始数">
              <el-input v-model="form.startAmount" placeholder="请输入开始数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束数">
              <el-input v-model="form.endAmount" placeholder="请输入结束数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="前置条件">
              <el-input v-model="form.precondition" placeholder="请输入前置条件"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="返利类型">
                <el-select v-model="form.rebateType" @change="changeRebateType" filterable  clearable placeholder="请选择">
                  <el-option v-for="item in rebateTypeOptions" :key="item.rebateType" :value="item.rebateType" :label="item.rebateName"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返利比例">
              <el-input v-model="form.rebateRatio" :disabled="form.rebateType !== 0" placeholder="请输入返利比例"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返利固定">
              <el-input v-model="form.rebateValue" :disabled="form.rebateType !== 1" placeholder="请输入返利固定"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返利组合">
              <el-input v-model="form.rebateCalculation" :disabled="form.rebateType !== 2" placeholder="请输入返利组合"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <div class="text-center">
          <el-button v-if="isEdit" @click="save" type="primary">保存</el-button>
          <el-button v-else @click="edit" type="primary">编辑</el-button>
          <el-button @click="goBack">返回</el-button>
      </div>
    </el-row>
  </section>
</template>
<script>
import { getMerchantRebateConf, merchantLevelSave, getMerchantLevel } from '@/service/service.js'
export default {
  name: 'merchant-profile',
  props: {
    merchantId: {
      default: ''
    }
  },
  data () {
    return {
      form: {
        promotionType: '',
        levleName: '',
        levleCode: '',
        levleIcon: '',
        precondition: '',
        rebateCalculation: '',
        rebateRatio: '',
        rebateType: '',
        rebateValue: '',
        startAmount: '',
        endAmount: '',
        merchantId: this.merchantId
      },
      promotionTypeOptions: [
      ],
      rebateTypeOptions: [
      ],
      isEdit: false,
      levleNameOptions: []
    }
  },
  methods: {
    async save () {
      let res = await merchantLevelSave(this.form)
      this.$handleRequestTip(res)
      // res.code === 200 && this.goBack()
    },
    goBack () {
      this.$router.go(-1)
    },
    edit () {
      this.isEdit = true
    },
    changeLevelName () {
      const levelItem = this.levleNameOptions.find(item => item.levelCode === this.form.levleCode)
      if (!levelItem) return
      this.form.levleName = levelItem.levelName
      this.form.levleIcon = levelItem.levelIcon
      this.promotionTypeOptions = levelItem.promotionTypeConf || []
      this.rebateTypeOptions = levelItem.rebateConf || []
    },
    changeRebateType () {
      // const rebateItem = this.rebateTypeOptions.find(item => item.rebateType === this.form.rebateType)
      this.form.rebateRatio = ''
      this.form.rebateValue = ''
      this.form.rebateCalculation = ''
    },
    changePromotionType () {
      const promotionItem = this.promotionTypeOptions.find(item => item.promotionType === this.form.promotionType)
      this.form.startAmount = promotionItem.levelScore
      this.form.endAmount = promotionItem.levelNextScore
    },
    async getData (id) {
      let res = await getMerchantLevel({ merchantId: id })
      res.code === 200 && (this.form = res.data || this.form) && (res.data && this.changeLevelName())
    }
  },
  async created () {
    const res = await getMerchantRebateConf()
    res.code === 200 && (this.levleNameOptions = res.data || []) && this.changeLevelName()
  },
  activated () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.$route.query.id !== undefined && this.getData(this.$route.query.id)
  },
  computed: {
  }
}
</script>

<style lang="scss" module>
</style>
