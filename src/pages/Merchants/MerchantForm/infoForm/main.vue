<template>
  <section class="product_brand_detail">
    <el-row class="mt-10">
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-col :span="12">
             <el-form-item label="账户类型">
                <el-select v-model="form.accountType"  filterable  clearable placeholder="请选择">
                  <el-option v-for="item in accountTypeOptions" :key="item.id" v-bind="item"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12" class="mb-10">
             <el-form-item label="是否默认">
              <el-radio-group v-model="form.isDefault">
                <el-radio v-for="item in sisDefaultOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="账户名称">
                <el-input v-model="form.accountName"  placeholder="请输入账户名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账户号">
              <el-input v-model="form.accountNo" placeholder="请输入账户号"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="银行编码">
              <el-input v-model="form.bankCode" placeholder="请输入银行编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行联行号">
              <el-input v-model="form.bankLinkNo" placeholder="请输入银行联行号"></el-input>
            </el-form-item>
          </el-col> -->
          <div v-if="form.accountType === 2">
            <el-col :span="12">
              <el-form-item label="银行账户类型">
                  <el-select v-model="form.bankType"  filterable  clearable placeholder="请选择">
                    <el-option v-for="item in bankTypeOptions" :key="item.id" v-bind="item"></el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行名称">
                <el-input v-model="form.bankName" placeholder="请输入银行名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户支行名称">
                <el-input v-model="form.branchName" placeholder="请输入开户支行名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户行所在省份">
                <el-input v-model="form.province" placeholder="请输入开户行所在省份"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户行所在城市">
                <el-input v-model="form.city" placeholder="请输入开户行所在城市"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <!-- <el-col :span="12">
            <el-form-item label="身份证号码">
              <el-input v-model="form.idcard" placeholder="请输入身份证号码"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input v-model="form.mobileNo" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
             <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
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
import { merchantAccountSave, getMerchantAccountById } from '@/service/service.js'
export default {
  name: 'merchant-info',
  props: {
    merchantId: {
      default: ''
    },
    accountId: {
      default: ''
    }
  },
  data () {
    return {
      form: {
        accountType: '',
        accountName: '',
        accountNo: '',
        bankCode: '',
        bankLinkNo: '',
        bankName: '',
        bankType: '',
        branchName: '',
        province: '',
        city: '',
        idcard: '',
        mobileNo: '',
        isDefault: '',
        merchantId: this.merchantId
      },
      statusOptions: [
        {
          label: '正常',
          value: 0
        },
        {
          label: '冻结',
          value: 1
        }
      ],
      sisDefaultOptions: [
        {
          label: '是',
          value: 1
        },
        {
          label: '否',
          value: 0
        }
      ],
      accountTypeOptions: [
        {
          label: '微信',
          value: 0
        },
        {
          label: '支付宝',
          value: 1
        },
        {
          label: '银行卡',
          value: 2
        }
      ],
      bankTypeOptions: [
        {
          label: '对公',
          value: 0
        },
        {
          label: '对私',
          value: 1
        }
      ],
      isEdit: false
    }
  },
  methods: {
    async save () {
      let res = await merchantAccountSave(this.form)
      this.$handleRequestTip(res)
      // res.code === 200 && this.goBack()
    },
    goBack () {
      // this.$router.go(-1)
      this.$emit('updateComp', 'info')
    },
    edit () {
      this.isEdit = true
    },
    async getData (id) {
      let res = await getMerchantAccountById({ id })
      res.code === 200 && (this.form = res.data || this.form)
    }
  },
  activated () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.accountId && this.getData(this.accountId)
  },
  computed: {
  }
}
</script>

<style lang="scss" module>
</style>
