<template name="my">
	<view>
		<scroll-view scroll-y class="page">
			<!-- title -->
			<view class="UCenter-bg">
				<image :src="userInfo.avatar||'../../static/logo.png'" class="png" mode="widthFix" @tap="loginClick" referrerpolicy="no-referrer"></image>
				<view class="text-xl margin-top" @tap="loginClick">{{userInfo.name||'请先登录'}}</view>
				<view class="text-sm margin-top-xs" @tap="loginClick">{{userInfo.remark||empty}}</view>
				<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-wave" referrerpolicy="no-referrer"></image>
			</view>
			<view class="padding flex text-center text-grey bg-white shadow-warp my-wave-margin">
			</view>
			<!-- content -->
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<view class="cu-item arrow" @tap="onItemClick" data-type="search">
					<view class="flex text-df">
						<text class="cuIcon-searchlist text-grey text-df"></text>
						<text class="text-grey" style="margin-left: 5px;">搜索干货</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="onItemClick" data-type="history">
					<view class="flex text-df">
						<text class="cuIcon-countdownfill text-grey text-df"></text>
						<text class="text-grey" style="margin-left: 5px;">历史干货</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="onItemClick" data-type="github">
					<view class="flex text-df">
						<text class="cuIcon-github text-grey text-df"></text>
						<text class="text-grey" style="margin-left: 5px;">其他Gank项目</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="onItemClick" data-type="about">
					<view class="flex text-df">
						<text class="cuIcon-infofill text-grey text-df"></text>
						<text class="text-grey" style="margin-left: 5px;">关于</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="onItemClick" data-type="like">
					<view class="flex text-df">
						<text class="cuIcon-likefill text-grey text-df"></text>
						<text class="text-grey" style="margin-left: 5px;">点赞</text>
					</view>
				</view>
			</view>

			<!-- 底部占位 -->
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data: () => {
			return {
				empty: "~~(>_<)~~",
				userInfo: {}
			}
		},
		mounted() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				this.userInfo = uni.getStorageSync("userInfo");
			},
			loginClick() {
				uni.navigateTo({
					url: "/pages/my/login"
				})
			},
			onItemClick(event) {
				let type = event.currentTarget.dataset.type;

				switch (type) {
					case "about":
						uni.navigateTo({
							url: "/pages/my/about"
						})
						break;
					case "search":
						uni.navigateTo({
							url: "/pages/my/search"
						})
						break;
					case "history":
						uni.navigateTo({
							url: "/pages/my/history"
						})
						break;
					case "github":
						uni.navigateTo({
							url: "/pages/my/other"
						})
						break;
					case "like":
						uni.navigateTo({
							url: `/pages/web/web?url=${encodeURIComponent("https://github.com/leiyun1993/GankUniApp")}`
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style>
	.UCenter-bg {
		background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
		background-size: cover;
		height: 450upx;
		display: flex;
		justify-content: center;
		padding-top: 40upx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 150upx;
		height: 150upx;
	}

	.UCenter-bg .png {
		border: 1upx solid #fff;
		border-radius: 50%;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100upx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100upx;
	}

	map,
	.mapBox {
		width: 750upx;
		height: 300upx;
	}

	.my-wave-margin {
		margin-top: -1upx;
	}
</style>
