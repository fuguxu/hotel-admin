<template>
    <div>
        <el-table border @selection-change="selectionChange" ref="table" v-bind="$attrs" v-on="$listeners" :header-cell-style="{backgroundColor:'#f5f7fa',fontWeight:700}">
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
                <template  slot="header" v-if="column.type === 'slot' && $scopedSlots['col-header-' + column.prop]" >
                  <slot
                  :name = "'col-header-' + column.prop"
                  :scope="scope"
                  >
                  </slot>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="showOperation" width="220px">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row, scope.$index, 'detail')" size="mini">详情</el-button>
                <el-button @click="handleEdit(scope.row, scope.$index, 'edit')" size="mini">编辑</el-button>
                <el-button @click="handleEdit(scope.row, scope.$index, 'delete')" size="mini" type="danger" >删除</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-pagination class="text-right mt-10" v-if="showPagination"
            v-on="$listeners"
            v-bind="$attrs"
            @current-change="currentChange"
            @size-change="sizeChange"
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
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    showOperation: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selections: []
    }
  },
  methods: {
    handleEdit (row, index, type) {
      this.$emit('operationHandler', ...arguments)
    },
    currentChange (currentPage) {
      this.$emit('handlePagination', currentPage, this.pageSize)
    },
    sizeChange (pageSize) {
      this.$emit('handlePagination', this.currentPage, pageSize)
    },
    selectionChange (selections) {
      this.selections = selections
      this.$emit('selectionChange', selections)
    },
    getSelection () {
      return this.selections
    }
  },
  mounted () {
    console.log(this.$scopedSlots)
  }
}
</script>
