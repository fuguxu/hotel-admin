<template>
  <section class="product_detail">
    <form-header>用户等级</form-header>
    <el-row class="mt-10">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="120px" :disabled="!isEdit">
          <el-form-item label="等级编码">
            <el-input v-model="form.levleCode"  placeholder="请输入等级编码"></el-input>
          </el-form-item>
          <el-form-item label="等级名称">
            <el-input v-model="form.levleName" placeholder="请输入等级名称"></el-input>
          </el-form-item>
          <el-form-item label="开始积分">
            <el-input v-model="form.startScore" placeholder="请输入开始积分"></el-input>
          </el-form-item>
          <el-form-item label="结束积分">
            <el-input v-model="form.endScore" placeholder="请输入结束积分"></el-input>
          </el-form-item>
          <el-form-item label="积分比例">
            <el-input v-model="form.addScoreRatio" placeholder="请输入积分比例"></el-input>
          </el-form-item>
          <el-form-item label="积分折扣">
            <el-input v-model="form.discount" placeholder="请输入积分折扣"></el-input>
          </el-form-item>
          <el-form-item label="等级图标">
            <m-upload v-model="form.levleIcon" :isShowDel="isEdit" dir="user/level"></m-upload>
          </el-form-item>
        </el-form>
        <div class="text-center">
            <el-button v-if="isEdit" @click="save" type="primary">保存</el-button>
            <el-button v-else @click="edit" type="primary">编辑</el-button>
            <el-button @click="goBack">返回</el-button>
        </div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import { saveUserLevel, getUserLevelById } from '@/service/service.js'
import header from '@/pages/Components/formHeader/main'
export default {
  data () {
    return {
      form: {
        levleCode: '',
        levleName: '',
        discount: '',
        endScore: '',
        startScore: '',
        levleIcon: '',
        addScoreRatio: ''
      },
      isEdit: false
    }
  },
  methods: {
    async save () {
      let res = await saveUserLevel(this.form)
      this.$handleRequestTip(res)
      res.code === 200 && this.goBack()
    },
    goBack () {
      this.$router.go(-1)
    },
    edit () {
      this.isEdit = true
    },
    async getData (id) {
      let res = await getUserLevelById({ id })
      res.code === 200 && (this.form = res.data || this.form)
    }
  },
  created () {
    this.isEdit = !!((!this.$route.query.id) || this.$route.query.edit)
    this.$route.query.id && this.getData(this.$route.query.id)
  },
  computed: {
  },
  components: {
    formHeader: header
  }
}
</script>

<style lang="scss" module>
</style>
