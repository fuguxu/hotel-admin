<template>
  <el-dialog title="买家秀审核" :visible.sync="visible" width="40%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="处理" >
          <el-select v-model="form.auditStatus"  clearable placeholder="请选择">
            <el-option v-for="item in hanldeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="意见">
          <el-input type="textarea" v-model="form.auditMsg" placeholder="请输入" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="save">提 交</el-button>
      </div>
    </el-dialog>
</template>
<script>
  import { buyerShowApproval } from '@/service/service'
  export default {
    props: {
      id: ''
    },
    data() {
      return {
        visible:false,
        form:{
          auditStatus: '',
          auditMsg: ''
        },
        hanldeOptions: [{value: '1',label:'通过'},{value: '2',label:'不通过'}],
      }
    },
    methods: {
      async save() {
        const res = await buyerShowApproval([{
          ...this.form,
          id: this.id
        }])
        this.$handleRequestTip(res)
        if(res.code === 200) {
          this.$emit('success')
          this.visible = false
        }
      },
      open() {
        this.visible = true
      }
    }
  }
</script>
