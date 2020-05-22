<template>
  <el-form-item v-bind="$attrs">
    <slot name="tip"></slot>
    <component @change="change" v-model="value" :placeholder="placeholder" v-on="$listeners" v-bind="$attrs" :is="currentComp">
      <template v-if="attributeValueList && childComp">
        <component v-for="(item, index) in attributeValueList" :label="item" :value="item" :key="index" :is="childComp.comp"></component>
      </template>
    </component>
  </el-form-item>
</template>
<script>
import { formItemContent } from './content'
export default {
  props: {
    value: {
    },
    elementType: String,
    attributeValueList: {
    }
  },
  data () {
    return {
    }
  },
  methods: {
    change (value) {
      this.$emit('input', value)
    }
  },
  computed: {
    currentComp () {
      return formItemContent[this.elementType].comp
    },
    placeholder () {
      return formItemContent[this.elementType].placeholder
    },
    childComp () {
      return formItemContent[this.elementType].child
    }
  }
}
</script>
