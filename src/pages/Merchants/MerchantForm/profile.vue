<template>
  <section class="product_brand_detail">
    <el-row class="mt-10">
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-col :span="12">
             <el-form-item label="等级名称">
                <el-input v-model="form.levleName"  placeholder="请输入等级名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="等级编码">
              <el-input v-model="form.levleCode" placeholder="请输入等级编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="晋升类型">
                <el-select v-model="form.promotionType"  filterable  clearable placeholder="请选择">
                  <el-option v-for="item in promotionTypeOptions" :key="item.id" v-bind="item"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="前置条件">
              <el-input v-model="form.precondition" placeholder="请输入前置条件"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返利组合">
              <el-input v-model="form.rebateCalculation" placeholder="请输入返利组合"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返利比例">
              <el-input v-model="form.rebateRatio" placeholder="请输入返利比例"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返利固定">
              <el-input v-model="form.rebateValue" placeholder="请输入身份证号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="返利类型">
                <el-select v-model="form.rebateType"  filterable  clearable placeholder="请选择">
                  <el-option v-for="item in rebateTypeOptions" :key="item.id" v-bind="item"></el-option>
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
import { merchantInfoSave, getDeptById } from '@/service/service.js'
export default {
  name: 'merchant-profile',
  data () {
    return {
      form: {
        promotionType: '',
        levleName: '',
        levleCode: '',
        precondition: '',
        rebateCalculation: '',
        rebateRatio: '',
        rebateType: '',
        rebateValue: '',
        startAmount: '',
        endAmount: ''
      },
      promotionTypeOptions: [
        {
          label: '金额数',
          value: '0'
        },
        {
          label: '订单数',
          value: '1'
        }
      ],
      rebateTypeOptions: [
        {
          label: '返利比例',
          value: '0'
        },
        {
          label: '返利固定',
          value: '1'
        },
        {
          label: '返利公式计算',
          value: '2'
        },
        {
          label: '返利组合',
          value: '3'
        }
      ],
      isEdit: false
    }
  },
  methods: {
    async save () {
      let res = await merchantInfoSave(this.form)
      this.$handleRequestTip(res)
      // res.code === 200 && this.goBack()
    },
    goBack () {
      this.$router.go(-1)
    },
    edit () {
      this.isEdit = true
    },
    async getData (id) {
      let res = await getDeptById({ id })
      res.code === 200 && (this.form = res.data || this.form)
    }
  },
  created () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.$route.query.id !== undefined && this.getData(this.$route.query.id)
  },
  computed: {
  }
}
</script>

<style lang="scss" module>
</style>
