<template>
  <el-breadcrumb class="app-levelbar" separator="/">
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
      <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{generateTitle(item.meta.title)}}</span>
      <router-link v-else :to="item.redirect||item.path">{{generateTitle(item.meta.title)}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
  export default {
    created() {
      this.getBreadcrumb()
    },
    data() {
      return {
        levelList: null
      }
    },
    methods: {
      generateTitle,
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.meta.title);
        const first = matched[0];
        if (first && (first.meta.title !== 'dashboard' || first.path !== '')) {
          matched = [{ meta: { title: 'dashboard' }, path: '/' }].concat(matched)
        }
        this.levelList = matched;
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
