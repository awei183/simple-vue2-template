<template>
  <ElSelect v-bind="$attrs">
    <ElOption v-for="op in options" :key="op.key || op.value" :label="op.label" :value="op.value" />
  </ElSelect>
</template>

<script>
import { ElSelect, ElOption } from 'element-plus'
export default {
  name: 'Select',
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  components: { ElSelect, ElOption },
}
</script>
