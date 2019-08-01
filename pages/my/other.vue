<template>
	<view class="bg-white page-other">
		<scroll-view scroll-y class="page" lower-threshold="60px" @scrolltolower="scrolltolower">

			<view v-for="(item,index) in dataList" :key="index" class="padding" @tap="onItemClick" :data-url="item.html_url">
				<view class="solid-bottom">
					<view class="text-title  text-cut">
						{{item.name}}
					</view>
					<view class="text-content  text-cut2">
						{{item.description}}
					</view>
					<view class="text-content  text-cut2">
						Updated on {{item.updated_at}}
					</view>
					<view class="avatar-box">
						<image :src="item.owner.avatar_url" @tap="nameClick" :data-url="item.owner.html_url" referrerpolicy="no-referrer"></image>
						<view class="name" @tap="nameClick" :data-url="item.owner.html_url">{{item.owner.login}}</view>
						<view class="language">
							<view class="icon-point" :style="[{backgroundColor:item.languageColor}]"></view>
							<text style="margin-left: 10upx;font-size: 26upx;">{{item.language}}</text>
						</view>
						<view class="language" style="width: 120upx;">
							<text class="cuIcon-favorfill"></text>
							<text style="margin-left: 10upx;font-size: 26upx;">{{item.startCount}}</text>
						</view>
					</view>
				</view>

			</view>
			<view class="cu-load bg-white" v-if="showLoading" :class="loading?'loading':'over'"></view>
		</scroll-view>
	</view>
</template>

<script>
	import api from "../../api/api.js";
	import util from "../../common/util.js"
	export default {
		data() {
			return {
				showLoading: false,
				loading: true,
				dataList: [],
				params: {
					page: 1,
					per_page: 10,
					q: "Gank",
					order: "desc",
					sort:"stars"
				}
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList() {
				this.showLoading = true;

				uni.request({
					url: `https://api.github.com/search/repositories`,
					method: "GET",
					data: this.params,
					success: (res) => {
						if (res.statusCode === 200) {
							console.log(res)
							res.data.items.map(item => {
								item.updated_at = util.formatDate(new Date(item.updated_at));
								item.languageColor = util.getLanguageColor(item.language);
								item.startCount = util.friendNum(item.stargazers_count);

							})
							this.dataList = this.params.page == 1 ? res.data.items : this.dataList.concat(res.data.items);
							if (this.dataList.length >= parseInt(res.data.total_count)) {
								this.loading = false;
							} else {
								this.showLoading = false;
								this.params.page++;
							}
						} else {
							uni.showToast({
								icon: "none",
								title: res.errMsg
							})
						}
					},
					fail: (e) => {
						uni.showToast({
							icon: "none",
							title: "网络异常！"
						})
					}
				})
			},
			scrolltolower() {
				if (!this.showLoading && this.loading) {
					this.getList();
				}
			},
			onItemClick(event) {
				let url = event.currentTarget.dataset.url;
				console.log(url);
				uni.navigateTo({
					url: `/pages/web/web?url=${encodeURIComponent(url)}`
				})
			},
			nameClick(event) {
				let url = event.currentTarget.dataset.url;
				console.log(url);
				uni.navigateTo({
					url: `/pages/web/web?url=${encodeURIComponent(url)}`
				})
			}
		}
	}
</script>

<style>
	.page-other .text-title {
		color: #0081ff;
		font-size: 32upx;
		font-weight: bold;

	}

	.page-other .avatar-box {
		display: flex;
		align-items: center;
		padding: 30upx 0;
	}

	.page-other .avatar-box image {
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
	}

	.language {
		display: flex;
		align-items: center;
		width: 200upx;
	}

	.page-other .avatar-box .name {
		flex: 1;
		padding: 0 10upx;
		color: #0081ff;
		font-size: 26upx;
	}

	.language .icon-point {
		width: 24upx;
		height: 24upx;
		border-radius: 50%;
		background-color: #007AFF;
		display: inline-block;
	}
</style>
