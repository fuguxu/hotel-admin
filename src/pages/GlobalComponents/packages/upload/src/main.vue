<template>
    <div>
        <div :class="$style.logoWrap" v-if="value">
            <img  :src="value" alt="">
            <div v-if="isShowDel" :class="$style.mask"><i @click="remove" :class="$style.icon" class="el-icon-delete"></i></div>
        </div>
        <el-upload
            v-else
            class="upload-demo"
            :with-credentials="true"
            drag
            :action="uploadUrl"
            :on-success="onSuccess"
            :on-error="onError"
            :show-file-list="false"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
     </div>
</template>
<script>
import { getUploadUrl } from '@/service/service'
export default {
  name: 'MUpload',
  props: {
    dir: String,
    value: String,
    isShowDel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onSuccess (res, file, fileList) {
      if (res.code === 200) {
        this.$emit('input', res.data.downloadUrl) // 将链接与v-model绑定
      } else {
        this.$message({
          type: 'error',
          message: '上传失败'
        })
      }
    },
    onError () {
      this.$message({
        type: 'error',
        message: '上传失败'
      })
    },
    remove () {
      this.$emit('input', '')
    }
  },
  mounted () {
    console.log(this.isShowDel)
  },
  computed: {
    uploadUrl () {
      return getUploadUrl({ dir: this.dir })
    }
  }
}
</script>

<style lang="scss" module>
  .logoWrap{
    position: relative;
    width: fit-content;
    .mask{
      position: absolute;
      width:100%;
      height:100%;
      top:0px;
      left:0px;
      background: rgba(0,0,0,0.3);
      display: none;
      .icon{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        font-size: 30px;
        color:#fff;
        cursor: pointer;
      }
    }
    &:hover{
      .mask{
        display: block;
      }
    }
  }
</style>
