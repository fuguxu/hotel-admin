<template>
    <div>
        <el-table  v-bind="$attrs" v-on="$listeners">
            <el-table-column v-for="column in columns" :key="column.prop"
                :prop="column.prop"
                :label="column.label"
                >
                <template slot-scope="scope">
                    <div></div>
                    {{column.render?column.render(scope):scope.row[column.prop]}}
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
