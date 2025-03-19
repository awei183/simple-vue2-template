<template>
  <span>{{ formated }}</span>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Date',
  props: ['value', 'row', 'componentProps'],
  computed: {
    formated() {
      return dayjs(this.value).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}
</script>

<style lang="scss" scoped></style>
