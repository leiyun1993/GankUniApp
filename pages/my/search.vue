<template>
	<view>
		<scroll-view scroll-y class="page" lower-threshold="60px" @scrolltolower="scrolltolower">
			<!-- title -->
			<cu-custom bgColor="bg-gradual-green" :isBack="true">
				<block slot="content">搜索</block>
			</cu-custom>
			<!-- content -->
			<view class="cu-bar search bg-white nav fixed" :style="[{top:CustomBar + 'px'}]">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @input="keywordInput" @confirm="searchClick" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频"
					 confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round" @tap="searchClick">搜索</button>
				</view>
			</view>
			<view class="classify-content">
				<view v-for="(item,index) in dataList" :key="index" class="cu-card dynamic no-card" @tap="onItemClick" :data-url="item.url">
					<view class="cu-item shadow solid-bottom" style="padding: 0 30upx;">
						<view class="flex">
							<view class="flex-sub">
								<view class="">
									<view class="text-content text-cut2">
										{{item.desc}}
									</view>
									<view class="p-xs margin-bottom-sm mb-sm" style="margin-top: 10upx;">
										<view class="cuIcon-myfill text-green" style="width: 250upx;display: inline-block;"><text class="text-black text-cut"
											 style="margin-left: 6upx;">{{item.who}}</text></view>
										<view class="cuIcon-timefill text-green" style="width: 250upx;display: inline-block;"><text class="text-black text-cut"
											 style="margin-left: 6upx;">{{item.publishedAt.substring(0,10)}}</text></view>
									</view>
								</view>
							</view>
							<view v-if="item.images&&item.images.length">
								<image class="item-image" lazy-load="true" :src="item.images[0]" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-load bg-white" v-if="showLoading" :class="loading?'loading':'over'"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from "../../api/api.js";
	export default {
		data() {
			return {
				showLoading: false,
				loading: true,
				CustomBar: this.CustomBar,
				dataList: [],
				page: 1,
				key: ""
			}
		},
		mounted() {

		},
		methods: {
			getList() {
				this.showLoading = true;
				api.get(`/search/query/${this.key}/category/all/count/10/page/${this.page}`)
					.then(res => {

						this.dataList = this.page == 1 ? res.results : this.dataList.concat(res.results);

						if (res.results.length < 10) {
							this.loading = false;
						} else {
							this.showLoading = false;
							this.page++;
						}
					}).catch(e => {
						if (this.page == 1) {
							this.dataList = [];
						}
						this.loading = false;
					})
			},
			keywordInput(event) {
				this.key = event.detail.value;
			},

			searchClick() {
				if (!this.key) {
					uni.showToast({
						icon: "none",
						title: "请输入搜索内容"
					})
					return;
				}
				this.getList();
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
			}
		}
	}
</script>

<style>
</style>
