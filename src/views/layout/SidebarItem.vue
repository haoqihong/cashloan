<template>
	<div class='menu-wrapper'>
	
	<template v-for="item in routes" v-if="item.show === '1'">
		<!-- <router-link v-if="item.children.length>0" :to="item.code+'/'+item.children[0].code">
			<el-menu-item :index="item.code+'/'+item.children[0].code" class='submenu-title-noDropdown'>
				<icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg>
				<span slot="title">{{item.children[0].title}}</span>
			</el-menu-item>
		</router-link> -->
		<el-submenu :index="item.code" :key="item.code">
			<template slot="title">
				<!-- <icon-svg v-if='item.icon' :icon-class="item.icon"></icon-svg> -->
				<i v-if='item.icon' class="icons" :class="'iconfont '+item.icon"></i>
				<span>{{generateTitle(item.code)}}</span>
			</template>
			<template v-for="child in item.children" v-if="child.show === '1'">
				<sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
				<router-link v-else :to="'/'+item.code+'/'+child.code">
					<el-menu-item :index="child.code">
						<!-- <icon-svg v-if='child.icon' :icon-class="child.icon"></icon-svg> -->
						<i v-if='child.icon' class="icons" :class="'iconfont '+child.icon"></i>
						<span>{{generateTitle(child.code)}}</span>
					</el-menu-item>
				</router-link>
			</template>
		</el-submenu>

	</template>

	</div>
</template>

<script>
	import { generateTitle } from '@/utils/i18n'
	export default {
		name: 'SidebarItem',
		props: {
		routes: {
			type: Array
		}
		},
		methods: {
			generateTitle
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icons {
	font-size: 14px;
}
</style>

