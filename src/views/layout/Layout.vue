<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar class="nav-container"></navbar>
			<tabs-view class="tags-container"></tabs-view>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from 'views/layout';
	import TabsView from './TabsView';
  export default {
		name: 'layout',
    components: {
      Navbar, Sidebar, AppMain, TabsView
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
		&.hideSidebar {
			.sidebar-container{
				width:36px;
				overflow: inherit;
			}
			.nav-container {
				position: fixed; 
				left: 36px; 
				top: 0; 
				width: 100%;  
				z-index: 99;
				background: #ffffff;
				border-bottom: 1px solid #f0f3f8;
			}
			.tags-container {
				position: fixed; 
				left: 36px; 
				top: 50px; 
				width: 100%;  
				z-index: 99;
				background: #ffffff;
				border-bottom: 1px solid #d8dce5;
				box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
			}
			.main-container {
				margin-left: 36px;
			}
		}
		.sidebar-container {
			transition: width 0.28s ease-out;
			width: 210px;
			height: 100%;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 1001;
			overflow-y: auto;
 			&::-webkit-scrollbar {display:none}
		}
		.nav-container {
			position: fixed; 
			left: 210px; 
			top: 0; 
			width: 100%;  
			z-index: 99;
			background: #ffffff;
			border-bottom: 1px solid #f0f3f8;
		}
		.tags-container {
			position: fixed; 
			left: 210px; 
			top: 50px; 
			width: 100%;  
			z-index: 99;
			background: #ffffff;
			border-bottom: 1px solid #d8dce5;
			box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
		}
		.main-container {
			min-height: 100%;
			transition: margin-left 0.48s ease-out;
			margin-left: 210px;
		}
	}
</style>
