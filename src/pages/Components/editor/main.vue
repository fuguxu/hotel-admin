<template>
    <div>
      <div ref="editor" style="text-align:left"></div>
    </div>
</template>
<script>
import { getUploadUrl } from '@/service/service'
import E from 'wangeditor'
let editor = null
export default {
  name: 'editor',
  props: {
    dir: String,
    value: {}
  },
  data () {
    return {
    }
  },
  methods: {
    getContent: function () {
    }
  },
  mounted () {
    editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.$emit('input', html)
    }
    editor.customConfig.withCredentials = true
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.uploadImgServer = this.uploadUrl
    editor.customConfig.uploadImgHooks = {
      customInsert: (insertImg, result, editor) => {
        result.code === 200 && (insertImg(result.data.downloadUrl))
      }
    }
    editor.create()
  },
  computed: {
    uploadUrl () {
      return getUploadUrl({ dir: this.dir })
    }
  },
  watch: {
    value (n) {
      if (n) editor.txt.html(this.value)
    }
  }
}
</script>
