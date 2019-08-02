<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<classify ref="classify" v-if="PageCur=='classify'"></classify>
		<meizi ref="meizi" v-if="PageCur=='meizi'"></meizi>
		<my ref="my" v-if="PageCur=='my'"></my>

		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action " @click="NavChange" data-cur="home" :class="PageCur=='home'?'text-green':'text-gray'">
				<view class="cuIcon-homefill"></view> 最新
			</view>
			<view class="action " @click="NavChange" data-cur="classify" :class="PageCur=='classify'?'text-green':'text-gray'">
				<view class="cuIcon-similar"></view> 分类
			</view>
			<view class="action text-gray add-action" @click="publishClick">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				发布
			</view>
			<view class="action" @click="NavChange" data-cur="meizi" :class="PageCur=='meizi'?'text-green':'text-gray'">
				<view class="cuIcon-album"></view> 妹子
			</view>
			<view class="action" @click="NavChange" data-cur="my" :class="PageCur=='my'?'text-green':'text-gray'">
				<view class="cuIcon-my"></view> 我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home'
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: "今日最新干货"
			})
		},
		onShow() {
			if (this.PageCur == "my") {
				this.$refs.my.getUserInfo();
			}
		},
		onReachBottom() {
			// #ifdef H5
			if (this.PageCur == "classify") {
				this.$refs.classify.scrolltolower();
			} else if (this.PageCur == "meizi") {
				this.$refs.meizi.scrolltolower();
			}
			// #endif
		},
		methods: {
			NavChange(e) {
				this.PageCur = e.currentTarget.dataset.cur;
				let title = "GankUniApp"
				switch (this.PageCur) {
					case "home":
						title = "今日最新干货";
						break;
					case "classify":
						title = "分类";
						break;
					case "meizi":
						title = "妹子";
						break;
					case "my":
						title = "";
						// #ifdef APP-PLUS
						title = "我的";
						// #endif

						break;
					default:
						break;
				}
				uni.setNavigationBarTitle({
					title: title
				})
			},
			publishClick(e) {
				uni.navigateTo({
					url: `/pages/publish/publish`
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
