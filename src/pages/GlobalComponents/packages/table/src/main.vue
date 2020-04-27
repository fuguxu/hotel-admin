<template>
    <div>
        <el-table  v-bind="$attrs" v-on="$listeners">
            <el-table-column v-for="column in columns" :key="column.prop"
                v-bind="column"
                >
                <template v-slot="scope" v-if="column.type === 'slot' && $scopedSlots['col-' + column.prop]" >
                  <slot
                  :name = "'col-' + column.prop"
                  :scope="scope"
                  >
                  </slot>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-on="$listeners"
            v-bind="$attrs"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            >
        </el-pagination>
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
    console.log(this.$scopedSlots)
  }
}
</script>
