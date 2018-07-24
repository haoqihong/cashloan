<template>
  <div class='tags-view-container'>
    <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
      <router-link class="tags-view-item" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
        <el-tag :closable="true" :type="isActive(tag.title)?'primary':''" @close='closeViewTabs(tag,$event)'>
          {{generateTitle(tag.title)}}
        </el-tag>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { generateTitle } from '@/utils/i18n'
export default {
  components: { ScrollPane },
  computed: {
    visitedViews() {
      return this.$store.state.app.visitedViews
    }
  },
  methods: {
    generateTitle,
    closeViewTabs(view, $event) {
      this.$store.dispatch('delVisitedViews', view).then(views => {
        const latestView = views.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView.path)
        } else {
          this.$router.push('/')
        }
      })
      $event.preventDefault()
    },
    generateRoute() {
      if (this.$route.matched[this.$route.matched.length - 1].name) {
        return this.$route.matched[this.$route.matched.length - 1]
      }
      this.$route.matched[0].path = '/'
      return this.$route.matched[0]
    },
    addViewTabs() {
      this.$store.dispatch('addVisitedViews', this.generateRoute())
    },
    isActive(title) {
      return title === this.$route.meta.title
    }
  },
  watch: {
    $route() {
      this.addViewTabs()
    }
  },
  mounted() {
    this.addViewTabs()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags-view-container {
    .tags-view-wrapper {
      background: #fff;
      height: 40px;
      line-height: 40px;
      .tags-view-item {
        display: inline-block;
        position: relative;
        height: 26px;
        line-height: 26px;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        &:first-of-type {
          margin-left: 10px;
        }
      }
    }
  }
.el-tag {
    background-color: #ffffff;
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    color: #757881;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
}
.el-tag--primary {
    background-color: #1fcf8f;
    border-color: #1fcf8f;
    color: #fff;
}
.app-wrapper .tags-container[data-v-7868aa39] {
    position: fixed;
    left: 210px;
    top: 50px;
    width: 100%;
    z-index: 99;
    background: #ffffff;
    border-bottom: 1px solid #f0f3f8;
    -webkit-box-shadow: 0 0 0 0 #d8dce5, 0 0 0 0 #d8dce5;
    box-shadow: 0 0 0 0 #d8dce5, 0 0 0 0 #d8dce5;
}

.tags-view-container .tags-view-wrapper .tags-view-item[data-v-208c6c12] {
  display: inline-block;
  position: relative;
  height: 26px;
  line-height: 26px;
  color: #495060;
  background: #fff;
  padding: 0 4px;
  font-size: 12px;
}
</style>
