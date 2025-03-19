<template>
  <div v-bind="$attrs" :class="['page-content', $props.class]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageContent',
}
</script>

<style lang="scss" scoped>
.page-content > :nth-child(n + 1):not(:last-child) {
  margin-bottom: 20px;
}
</style>
