<template>
  <span>{{ value ?? '' }}</span>
</template>

<script>
export default {
  name: 'Txt',
  props: ['value', 'row', 'componentProps'],
}
</script>
