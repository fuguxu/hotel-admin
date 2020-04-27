<template>
    <div>
        <el-table  v-bind="$attrs" v-on="$listeners">
            <el-table-column v-for="column in columns" :key="column.prop"
                v-bind="column"
                >
                <template v-if="column.type === 'slot'" >
                  <slot
                  :name = "'col-' + column.prop"
                  :row="column"
                  >
                  </slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  name: 'MTable',
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.$attrs)
  }
}
</script>
