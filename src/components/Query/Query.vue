<template>
  <ElForm v-bind="$attrs" inline :class="[$props.class, 'query-form']">
    <ElFormItem
      v-for="{ type, placeholder, label, field, options, clearable = true, ...attrs } in schemas"
      :key="field"
      :label="label"
    >
      <component
        :is="type"
        v-bind="attrs"
        :class="['query-item', attrs?.class]"
        :placeholder="placeholder || (label ? `按${label}查询` : '')"
        :options="options"
        :clearable="clearable"
        v-model="modelValue[field]"
      >
      </component>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="onQuery">
        <ElIcon><SearchIcon /></ElIcon>
        <span>查询</span>
      </ElButton>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="info" @click="onReset">
        <ElIcon><RefreshLeftIcon /></ElIcon>
        <span>重置</span>
      </ElButton>
    </ElFormItem>
    <slot />
  </ElForm>
</template>

<script>
import { ElDatePicker, ElForm, ElFormItem, ElInput, ElOption, ElButton, ElIcon } from 'element-plus'
import { Search as SearchIcon, RefreshLeft as RefreshLeftIcon, Refresh as RefreshIcon } from '@element-plus/icons-vue'
import Select from './Select.vue'
import { toRaw } from 'vue'
import { cloneDeep, get, isEmpty } from 'lodash-es'

/**
 * @typedef {Schema}
 * @property {string} field
 * @property {string?} label
 * @property {string?} placeholder
 * @property {'txt'|'enum'|'date'} type
 * @property {object?} attrs
 * @property {type === 'select' ? {label: string, value: any}[] : undefined} options
 */

export default {
  name: 'Query',
  components: {
    ElForm,
    ElFormItem,
    txt: ElInput,
    enum: Select,
    date: ElDatePicker,
    ElOption,
    ElButton,
    ElIcon,
    SearchIcon,
    RefreshLeftIcon,
    RefreshIcon,
  },
  emits: ['query', 'update:modelValue'],
  props: {
    schemas: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Object,
      default: {},
    },
    initEmitQuery: {
      type: Boolean,
      default: false,
    },
    /// open the query with pagination of mode.
    pagabled: {
      type: Boolean,
      default: false,
    },
    /// the page key of pagination
    page: {
      type: String,
      default: 'current',
    },
    /// the size key of pagination
    size: {
      type: String,
      default: 'size',
    },
  },
  data() {
    const initialValues = cloneDeep(toRaw(this.modelValue))
    const defaultPage = get(initialValues, this.page) || 1
    const defaultSize = get(initialValues, this.size) || 10
    return { initialValues: isEmpty(initialValues) ? {} : initialValues, defaultPage, defaultSize }
  },
  methods: {
    onReset() {
      /// This First Value will be setting to 'initialValue', and use it at 'reset' event.
      this.$emit('update:modelValue', cloneDeep(toRaw(this.initialValues)))
    },
    onQuery() {
      if (this.pagabled) {
        const initialValue = toRaw(this.initialValues)
        const query = {
          ...toRaw(this.modelValue),
          /// reset pagination query fields
          [this.page]: initialValue[this.page] || this.defaultPage,
          [this.size]: initialValue[this.size] || this.defaultSize,
        }
        this.$emit('update:modelValue', query)
        this.$emit('query', query)
        return
      }
      this.$emit('query', toRaw(this.modelValue))
    },
  },
  mounted() {
    if (this.initEmitQuery) {
      this.$emit('query', toRaw(this.modelValue))
    }
  },
}
</script>

<style lang="scss" scoped>
.query-form {
  & > :deep(.el-form-item):nth-child(n + 1):not(:last-child) {
    margin-right: 16px;
  }
  & > :deep(.el-form-item):last-child {
    margin-right: 0px;
  }
}
.query-item {
  width: 220px;
}
</style>
