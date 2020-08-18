<template>
  <section class="product_brand_detail">
    <el-row class="mt-10">
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-col :span="12">
             <el-form-item label="商户类型">
                <el-select v-model="form.merchantType"  filterable  clearable placeholder="请选择">
                  <el-option v-for="item in merchantTypeOptions" :key="item.id" v-bind="item"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="商户名称">
                <el-input v-model="form.merchantName"  placeholder="请输入商户名称"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称">
              <el-input v-model="form.companyName" placeholder="请输入公司名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商户等级">
              <el-input v-model="form.merchantLevelCode" placeholder="请输入等级编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址">
              <el-input v-model="form.detailAddress" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人">
              <el-input v-model="form.contactsName" placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input v-model="form.mobileNo" placeholder="请输入手机号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同时间">
              <el-col :span="11">
                <el-date-picker
                  v-model="form.contractStartTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
              <el-col :span="2" class="text-center"> -- </el-col>
              <el-col :span="11">
                <el-date-picker
                  v-model="form.contractEndTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保证金">
              <el-input v-model="form.earnestMoney" placeholder="请输入保证金"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同文件">
              <m-upload v-model="form.brandLogo" type="button" typeText="合同文件" :isShowDel="isEdit" dir="merchant/info"></m-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分销金额">
              <el-input disabled="" v-model="form.distributMoney" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="冻结金额">
              <el-input disabled="" v-model="form.frozenMoney" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="历史总金额">
              <el-input disabled="" v-model="form.totalDistributMoney" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
             <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio v-for="item in statusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <h1>企业信息</h1>
            <el-col :span="12">
              <el-form-item label="法人">
                <el-input v-model="form.detailInfoDto.legalName" placeholder="请输入法人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人手机号">
                <el-input v-model="form.detailInfoDto.legalMobileNo" placeholder="请输入法人手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人身份证号">
                <el-input v-model="form.detailInfoDto.idcard" placeholder="请输入法人身份证号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="营业执照">
                <m-upload v-model="form.detailInfoDto.businessLicenseImage" type="button" typeText="上传" :isShowDel="isEdit" dir="merchant/info"></m-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证正面">
                <m-upload v-model="form.detailInfoDto.idcardPositiveImage" type="button" typeText="上传" :isShowDel="isEdit" dir="merchant/info"></m-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证反面">
                <m-upload v-model="form.detailInfoDto.idcardBackImage" type="button" typeText="上传" :isShowDel="isEdit" dir="merchant/info"></m-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="确认函">
                <m-upload v-model="form.detailInfoDto.confirmLetterImage" type="button" typeText="上传" :isShowDel="isEdit" dir="merchant/info"></m-upload>
              </el-form-item>
            </el-col>
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
import { merchantInfoSave, getMerchantInfoById } from '@/service/service.js'
export default {
  name: 'merchant-base',
  props: {
    merchantId: {
      default: ''
    }
  },
  data () {
    return {
      form: {
        merchantType: '',
        merchantName: '',
        companyName: '',
        merchantLevelCode: '',
        detailAddress: '',
        contactsName: '',
        email: '',
        mobileNo: '',
        contractStartTime: '',
        contractEndTime: '',
        earnestMoney: '',
        detailInfoDto: {
          legalName: '',
          legalMobileNo: '',
          idcard: '',
          idcardPositiveImage: '',
          idcardBackImage: '',
          confirmLetterImage: ''
        }
      },
      statusOptions: [
        {
          label: '正常',
          value: 0
        },
        {
          label: '冻结',
          value: 1
        },
        {
          label: '待审核',
          value: 2
        }
      ],
      merchantTypeOptions: [
        {
          label: '分销会员',
          value: 1
        },
        {
          label: '商家',
          value: 2
        }
      ],
      isEdit: false
    }
  },
  methods: {
    async save () {
      let res = await merchantInfoSave(this.form)
      this.$handleRequestTip(res)
      res.code === 200 && this.$emit('updateMerchantId', res.data)
    },
    goBack () {
      this.$router.go(-1)
    },
    edit () {
      this.isEdit = true
    },
    async getData (id) {
      let res = await getMerchantInfoById({ id })
      res.code === 200 && (res.data.detailInfoDto = res.data.detailInfoDto || {}) && (this.form = res.data || this.form)
    }
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
