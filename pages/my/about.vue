<template>
	<view class="bg-white">
		<scroll-view scroll-y class="page">
			<view class="about-box">
				<view class="title solid-bottom">
					Gank.io
				</view>
				<view class="content">
					每日分享妹子图 和 技术干货，还有供大家中午休息的休闲视频。<text class="text-blue" data-url="http://gank.io" @tap="onUrlClick">http://gank.io</text>
				</view>
				<view class="title solid-bottom">
					UniApp
				</view>
				<view class="content">
					uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架。<text class="text-blue"
					 data-url="https://uniapp.dcloud.io" @tap="onUrlClick">https://uniapp.dcloud.io</text>
				</view>
				<view class="title solid-bottom">
					GankUniApp
				</view>
				<view class="content">
					开发者：<text class="text-blue" data-url="https://github.com/leiyun1993" @tap="onUrlClick">YunLei</text>
				</view>
				<view class="content">
					使用Gank提供的开放Api加上uni框架开发的一个程序，目前只测试了微信小程序。<text class="text-blue" data-url="https://github.com/leiyun1993/GankUniApp"
					 @tap="onUrlClick">GankUniApp</text>
				</view>
				<view class="title solid-bottom">
					开源库
				</view>
				<view class="content">
					ColorUI组件库<text class="text-blue" data-url="https://github.com/weilanwl/ColorUI" @tap="onUrlClick">ColorUI</text>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		methods: {
			onUrlClick(event) {
				let url = event.currentTarget.dataset.url;
				uni.navigateTo({
					url: `/pages/web/web?url=${encodeURIComponent(url)}`
				})
			}
		}
	}
</script>

<style>
	.about-box {
		padding: 30upx;
	}

	.about-box .title {
		font-size: 32upx;
		color: #1a1a1a;
		padding: 30rpx 0;
	}

	.about-box .content {
		font-size: 26upx;
		color: #1a1a1a;
		padding: 30rpx 0;
	}
</style>
