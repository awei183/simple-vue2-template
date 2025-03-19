<template>
  <div class="common-layout">
    <ElContainer class="common-container">
      <ElHeader class="common-header">
        <Logo />
        <right />
      </ElHeader>
      <ElContainer class="common-main">
        <Aside width="200px" class="common-aside">Aside</Aside>
        <ElMain class="common-content">
          <Tags />
          <ElScrollbar class="common-scrollbar" view-class="common-scrollbar-view">
            <Page>
              <router-view />
            </Page>
          </ElScrollbar>
        </ElMain>
      </ElContainer>
    </ElContainer>
  </div>
</template>

<script>
import { ElAside, ElContainer, ElHeader, ElMain, ElScrollbar } from 'element-plus'
import { Page } from '@/components/Page'
import Logo from './components/Logo.vue'
import { Right } from './components/right'
import Aside from './components/aside'
import { AUTHENTICATION_LAYOUT } from './constants'
import Tags from './components/tag'
export default {
  name: AUTHENTICATION_LAYOUT,
  components: {
    Logo,
    Right,
    Aside,
    Tags,
    Page,
    ElScrollbar,
    ElHeader,
    ElContainer,
    ElMain,
    ElAside,
  },
}
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  overflow: hidden;
  overscroll-behavior: contain;

  .common-container {
    height: 100%;
  }

  .common-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 1rem;
    border-bottom: 1px solid var(--el-menu-border-color);
  }

  .common-aside {
    padding: 0.5rem;
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-menu-border-color);
    display: flex;
    flex-direction: column;
  }

  .common-main {
    min-height: 0;
  }

  .common-content {
    background-color: var(--el-fill-color-lighter);
    padding: var(--custom-main-padding);
    overflow: hidden;
    display: flex;
    min-height: 0;
    flex-direction: column;
  }

  .common-scrollbar {
    & > :deep(.el-scrollbar__wrap) {
      overscroll-behavior: contain;
    }
  }

  :deep(.common-scrollbar-view) {
    padding: 12px 0px;
  }
}
</style>
