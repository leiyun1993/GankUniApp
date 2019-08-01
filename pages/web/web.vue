<template>
	<view>
		<scroll-view scroll-y class="page">

			<!-- #ifdef APP-PLUS -->
			<cu-custom bgColor="bg-gradual-green" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">提交干货</block>
			</cu-custom>
			<!-- #endif -->
			<web-view :src="url"></web-view>
		</scroll-view>
	</view>
</template>

<script>
	var wv; //计划创建的webview
	export default {
		data() {
			return {
				url: ""
			}
		},
		methods: {
			onLoad(options) {
				console.log(options);
				this.url = decodeURIComponent(options.url);


			},
			onReady() {
				// #ifdef APP-PLUS
				var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
				setTimeout(function() {
					wv = currentWebview.children()[0]
					wv.setStyle({
						top: this.CustomBar,
					})
				}, 1000); //如果是页面初始化调用时，需要延时一下
				// #endif
			}
		}
	}
</script>

<style>

</style>
