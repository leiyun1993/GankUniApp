<template name="classify">
	<view>
		<scroll-view scroll-y class="page" lower-threshold="60px" @scrolltolower="scrolltolower">
			<!-- title -->
			<cu-custom bgColor="bg-gradual-green" :isBack="false">
				<block slot="content">分类</block>
			</cu-custom>
			<!-- content -->
			<scroll-view scroll-x class="bg-white nav fixed" :style="[{top:CustomBar + 'px'}]" scroll-with-animation
			 :scroll-left="scrollLeft">
				<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tabs" :key="index" @tap="tabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>

			<view class="classify-content">
				<view class="cu-load bg-white" v-if="showTopLoading" :class="loading?'loading':'erro'"></view>
				<view v-for="(item,index) in dataList" :key="index" class="cu-card dynamic no-card" @tap="onItemClick" :data-url="item.url">
					<view class="cu-item shadow solid-bottom" style="padding: 0 30upx;">
						<view class="flex">
							<view class="flex-sub">
								<view class="">
									<view class="text-content  text-cut2">
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
			<!-- 底部占位 -->
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import api from "../../api/api.js";
	export default {
		data() {
			return {
				showLoading: false,
				showTopLoading: false,
				loading: true,
				CustomBar: this.CustomBar,
				TabCur: 0,
				scrollLeft: 0,
				tabs: [{
						name: "全部",
						category: "all"
					},
					{
						name: "Android ",
						category: "Android"
					},
					{
						name: "iOS",
						category: "iOS"
					},
					{
						name: "App",
						category: "App"
					},
					{
						name: "前端",
						category: "前端"
					},
					{
						name: "瞎推荐",
						category: "瞎推荐"
					},
					{
						name: "拓展资源 ",
						category: "拓展资源"
					},
					{
						name: "休息视频 ",
						category: "休息视频"
					}
				],
				dataList: [],
				page: 1
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			tabSelect(event) {
				this.TabCur = event.currentTarget.dataset.id;
				this.scrollLeft = (event.currentTarget.dataset.id - 1) * 60;
				this.page = 1;
				this.loading = true;
				this.getList();
			},
			getList() {
				
				if (this.page == 1) {
					this.showTopLoading = true;
				}else{
					this.showLoading = true;
				}
				api.get(`/data/${this.tabs[this.TabCur].category}/10/${this.page}`)
					.then(res => {

						this.dataList = this.page == 1 ? res.results : this.dataList.concat(res.results);
						this.showTopLoading = false;
						if (res.results.length < 10) {
							this.loading = false;
						} else {
							this.showLoading = false;
							this.page++;
						}
					}).catch(e => {
						if (this.page == 1) {
							this.dataList = [];
							this.showTopLoading = true;
							this.showLoading = false;
						} else {
							this.showTopLoading = false;
							this.showLoading = true;
						}
						this.loading = false;
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
			}
		}
	}
</script>

<style>
	.classify-content {
		padding-top: 90upx;
	}
</style>
