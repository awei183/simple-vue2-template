<template>
  <div class="table-container">
    <el-table v-bind="$attrs" border v-loading="$props.loading" max-height="480">
      <el-table-column
        v-for="{ field, title, width, component, componentProps, ...attrs } in columns"
        :key="field"
        v-bind="attrs"
        :prop="field"
        :label="title"
        :width="width"
      >
        <template #default="scope">
          <component
            :is="component || 'txt'"
            :row="scope.row"
            :value="get(scope.row, field)"
            :componentProps="componentProps"
          />
        </template>
      </el-table-column>
      <slot />
    </el-table>
    <el-pagination
      v-bind:current-page="currentPage"
      v-on:update:current-page="v => $emit('update:currentPage', v)"
      v-bind:page-size="pageSize"
      v-on:update:page-size="v => $emit('update:pageSize', v)"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @change="(c, s) => $emit('pageChange', c, s)"
      class="table-pagination"
    />
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import { get } from 'lodash-es'
import * as DefineComponents from './column'

export default {
  name: 'Table',
  components: { ElTable, ElTableColumn, ElPagination, ...DefineComponents },
  emits: ['update:currentPage', 'update:pageSize', 'pageChange'],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    get,
  },
}
</script>

<style lang="scss" scoped>
.table-container {
  & > :nth-child(n + 1):not(:last-child) {
    margin-bottom: 20px;
  }
}
.table-pagination {
  justify-content: flex-end;
}
</style>
