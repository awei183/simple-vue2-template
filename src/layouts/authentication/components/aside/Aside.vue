<template>
  <ElAside v-bind="$attrs" class="aside">
    <Welcome style="margin-top: 1rem" />
    <ElInput v-model.lazy="search" placeholder="请输入菜单名字" style="margin-top: 1rem; margin-bottom: 0.75rem">
      <template #suffix>
        <ElIcon>
          <Search />
        </ElIcon>
      </template>
    </ElInput>
    <Menus class="menus" :menus="menus" />
  </ElAside>
</template>

<script>
import { ElAside, ElInput, ElIcon } from 'element-plus'
import Menus from './Menus.vue'
import Welcome from './Welcome.vue'
import { Search } from '@element-plus/icons-vue'
import { mapGetters } from 'vuex'
import { toRaw } from 'vue'
import { flatMapRouteMenus } from '@/layouts/authentication'

export default {
  name: 'Aside',
  components: { ElAside, Menus, Welcome, ElInput, ElIcon, Search },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters(['permission_routes']),
    menus() {
      // search menu
      return flatMapRouteMenus(toRaw(this.permission_routes)).flatMap(r => {
        if (r.title.toLowerCase().includes(this.search)) {
          return [r]
        }
        if (r.children.some(c => c.title.toLowerCase().includes(this.search))) {
          return [{ ...r, children: r.children.filter(c => c.title.toLowerCase().includes(this.search)) }]
        }
        return []
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.menus {
  flex: 1;
  min-height: 0;
}
</style>
