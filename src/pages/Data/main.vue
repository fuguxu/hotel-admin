<template>
  <div>
    <el-button>111</el-button>
    <el-input v-model="value"></el-input>
    <div class="test" :class="$style.tsr"></div>
    <i class="icon el-icon-info"></i>
    <m-table :data="tableData" :columns="columns" :currentPage="currentPage" :pageSize="pageSize" :total="total">
      <template v-slot:col-address="{scope}">
        <el-input :disabled="scope.row.disabled" v-model="scope.row.address"></el-input>
      </template>
    </m-table>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import pagination from '@/mixins/pagination'
export default {
  mixins: [pagination],
  data () {
    return {
      value: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          disabled: true
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      columns: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address',
          type: 'slot'
        }
      ]
    }
  },
  methods: {
    render (row, index, column) {
      console.log(row, index, column)
    }
  },
  mounted () {
  },
  created () {
    console.log(333)
  }
}
</script>
<style lang="scss" module>
.tsr {
  display: flex;
  align-items: center;
  background: url("../../img/evection.png") no-repeat center;
}
</style>
<style scoped>
.test {
  width: 20px;
  height: 20px;
  /* background:red; */
  transform: translate(45px);
}
.el-input >>> .el-input__inner {
  width: 200px;
}
</style>
