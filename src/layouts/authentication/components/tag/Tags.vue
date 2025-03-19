<template>
  <ElTabs
    class="tags"
    type="card"
    :closable="tags.length > 1"
    :model-value="$route.path"
    :addable="false"
    @tab-click="tabClick"
    @tab-remove="tabRemove"
  >
    <ElTabPane v-for="opt in tags" :key="opt.path" :label="opt.title" :name="opt.path">
      <template #label>
        <span class="custom-tabs-label">
          <ElIcon v-if="!!opt.icon"><Icon :icon="opt.icon" /></ElIcon>
          <span>{{ opt.title }}</span>
        </span>
      </template>
    </ElTabPane>
  </ElTabs>
</template>

<script>
import { ElTabs, ElTabPane, ElIcon } from 'element-plus'
import { initTags4LS, storeTags4LS } from '@/layouts/authentication'
import { toRaw } from 'vue'
import { isEmpty, keyBy } from 'lodash-es'
import { Calendar } from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'

export default {
  name: 'Tags',
  components: { ElTabs, ElTabPane, ElIcon, Calendar, Icon },
  data() {
    const path = this.$route.path
    const title = this.$route.meta?.title || 'Unknown'
    const icon = this.$route.meta?.icon || 'carbon:unknown'
    // const stored = initTags4LS()
    return {
      // tags: isEmpty(stored) ? [{ path, title, icon }] : stored,
      tags: [{ path, title, icon }],
    }
  },
  methods: {
    tabClick({ paneName }) {
      this.$router.push(paneName)
    },
    tabRemove(paneName) {
      const data = toRaw(this.tags)

      const record = keyBy(data, 'path')
      delete record[paneName]
      const tags = Object.values(record)
      storeTags4LS(tags)
      this.tags = tags

      const current = this.$route.path
      if (paneName === current) {
        const idx = Object.fromEntries(data.map((d, i) => [d.path, i]))
        const rIdx = Object.fromEntries(data.map((d, i) => [i, d.path]))

        if (idx[paneName] === 0 && rIdx[1]) {
          this.$router.push(rIdx[1])
          return
        }
        if (rIdx[idx[paneName] - 1]) {
          this.$router.push(rIdx[idx[paneName] - 1])
        }
      }
    },
  },
  watch: {
    $route({ path, meta }) {
      if (!isEmpty(meta)) {
        const record = keyBy(toRaw(this.tags), 'path')
        if (record[path]) {
          return
        }
        const tags = [...Object.values(record), { path, title: meta.title, icon: meta.icon }]
        storeTags4LS(tags)
        this.tags = tags
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tags {
  --el-tabs-header-height: 36px;
  --el-font-size-base: var(--el-font-size-small);
  border-radius: 4px;
  margin-bottom: var(--custom-main-padding);
  :deep(.el-tabs__header) {
    margin: 0;
  }
}
.custom-tabs-label {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
