<template>
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.meta.title" :collapse="isCollapse"
    :default-openeds="defaultArr" active-text-color="#34a0ff">
      <sidebar-item :routes='permissionMenus'></sidebar-item>
    </el-menu>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    data() {
      return {
        defaultArr: ['adminSys']
      }
    },
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar',
        'permissionMenus'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
