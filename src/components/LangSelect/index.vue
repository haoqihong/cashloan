<template>
  <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div>
      <i class="international-icon iconfont cashloan-icon-zhongyingwenqiehuan"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
      <!-- <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item> -->
      <el-dropdown-item command="id" :disabled="language==='id'">Bahasa indonesia</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      this.$message({
        message: 'switch language success',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 24px;
  cursor: pointer;
}
</style>


