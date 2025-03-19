<template>
  <span>{{ label }}</span>
</template>

<script>
import { toRaw } from 'vue'

export default {
  name: 'Enums',
  props: ['value', 'row', 'componentProps'],
  computed: {
    label() {
      const enums = toRaw(this.componentProps.enums)
      return enums[this.value] || '-'
    },
  },
}
</script>
