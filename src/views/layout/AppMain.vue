<template>

	<section class="app-main" style="min-height: 100%">
		<transition name="fade" mode="out-in">
			<keep-alive :include="cachedViews">
			  <router-view :key="key"></router-view>
      </keep-alive>
		</transition>
	</section>
</template>

<script>
	export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    },
    cachedViews() {
      return this.$store.state.app.cachedViews
    }
  }
}
</script>
<style>
.app-main {
  margin-top: 90px;
}
</style>

