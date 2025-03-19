<template>
  <ElCard shadow="never" class="page-card">
    <template #header>
      <div class="card-header">
        <div class="card-header-container">
          <ElIcon class="card-header-icon" v-if="$route.meta.icon"><Icon :icon="$route.meta.icon" /></ElIcon>
          <span class="card-header-title">{{ $route.meta.title || 'Unknown' }}</span>
        </div>
        <slot name="extra" />
      </div>
    </template>
    <PageContent>
      <slot />
    </PageContent>
  </ElCard>
</template>

<script>
import { ElCard, ElIcon } from 'element-plus'
import { Icon } from '@iconify/vue'
import PageContent from './PageContent.vue'
export default {
  name: 'Page',
  components: { ElIcon, ElCard, Icon },
}
</script>

<style lang="scss" scoped>
.page-card {
  border: none;
  &:deep(.el-card__header) {
    border: none;
  }
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .card-header-container {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 8px;
    .card-header-icon {
      font-size: 20px;
    }
    .card-header-title {
      font-size: 20px;
      font-weight: 500;
      line-height: 1;
    }
  }
}
</style>
