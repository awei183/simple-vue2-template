<template>
  <ElScrollbar v-bind="$attrs">
    <ElMenu class="menu-container" size="small" :router="true" :default-active="$route.path">
      <template v-for="menu in menus" :key="menu.path">
        <ElSubMenu v-if="!!menu.children && menu.children.length > 0" :index="menu.path">
          <template #title>
            <ElIcon v-if="menu.icon"><Icon :icon="menu.icon" /></ElIcon>
            <span>{{ menu.title }}</span>
          </template>
          <ElMenuItem v-for="subMenu in menu.children" :key="subMenu.path" :index="subMenu.path">
            <span style="margin-left: 8px">{{ subMenu.title }}</span>
          </ElMenuItem>
        </ElSubMenu>
        <ElMenuItem v-else :index="menu.path">
          <ElIcon v-if="menu.icon"><Icon :icon="menu.icon" /></ElIcon>
          <span>{{ menu.title }}</span>
        </ElMenuItem>
      </template>
    </ElMenu>
  </ElScrollbar>
</template>

<script>
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon, ElScrollbar } from 'element-plus'
import { HomeFilled } from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'

export default {
  name: 'Menus',
  components: { ElMenu, ElMenuItem, ElSubMenu, ElIcon, HomeFilled, ElScrollbar, Icon },
  props: ['menus'],
}
</script>

<style lang="scss" scoped>
.menu-container {
  min-height: 0;
  border-right: none;
}
.menu-container .el-menu-item {
  color: var(--el-text-color-regular);
}
.menu-container .el-menu-item:not(.is-active):hover {
  color: var(--el-text-color-primary);
  background-color: transparent;
}
.menu-container .is-active:not(.is-opened):not(.el-sub-menu) {
  color: var(--el-color-white);
  background-color: var(--custom-menu-active-bg-color);
  border-radius: 4px;
}
.menu-container li {
  margin-block: 4px;
}
</style>
