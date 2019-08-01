<template>
	<view>
		<scroll-view scroll-y class="page" lower-threshold="60px" @scrolltolower="scrolltolower">
			<!-- 妹子图 -->
			<swiper v-if="meiziList.length>0" :class="showCardSwiper?'card-swiper':'screen-swiper'" :indicator-dots="false" :circular="true" :autoplay="true"
			 interval="5000" duration="500" @change="cardSwiper">
				<swiper-item v-for="(item,index) in meiziList" :key="index" :class="cardCur==index?'cur':''" @tap="onMeiZiItemClick"
				 :data-url="item.url">
					<view class="swiper-item" v-if="showCardSwiper">
						<image :src="item.url" mode="aspectFill" referrerpolicy="no-referrer"></image>
					</view>
					<image :src="item.url" mode="aspectFill" v-if="!showCardSwiper" referrerpolicy="no-referrer"></image>
				</swiper-item>
			</swiper>
			<view v-for="(item,index) in dataList" :key="index">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-green"></text> {{item.name}}
					</view>
				</view>
				<view v-for="(citem,cindex) in item.data" :key="cindex" class="cu-card dynamic no-card" @tap="onItemClick"
				 :data-url="citem.url">
					<view class="cu-item shadow solid-bottom" style="padding: 0 30upx;">
						<view class="flex">
							<view class="flex-sub">
								<view class="">
									<view class="text-content  text-cut2">
										{{citem.desc}}
									</view>
									<view class="p-xs margin-bottom-sm mb-sm" style="margin-top: 10upx;">
										<view class="cuIcon-myfill text-green" style="width: 250upx;display: inline-block;"><text class="text-black text-cut"
											 style="margin-left: 6upx;">{{citem.who}}</text></view>
										<view class="cuIcon-timefill text-green" style="width: 250upx;display: inline-block;"><text class="text-black text-cut"
											 style="margin-left: 6upx;">{{citem.publishedAt.substring(0,10)}}</text></view>
									</view>
								</view>
							</view>
							<view v-if="item.images&&citem.images.length">
								<image class="item-image" lazy-load="true" :src="citem.imageUrl" mode="aspectFill" referrerpolicy="no-referrer"></image>
							</view>
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
	export default {
		data() {
			return {
				date: "",
				cardCur: 0,
				meiziList: [],
				dataList: [],
				showCardSwiper: true,
				showLoading: false,
				loading: true
			}
		},
		mounted() {

		},
		methods: {
			onLoad(options) {
				this.date = options.date;
				uni.setNavigationBarTitle({
					title:this.date
				})
				this.getDetail();
			},
			getDetail() {
				this.showLoading = true;
				api.get(`/day/${this.date.replace(/-/g,"/")}`)
					.then(res => {
						this.meiziList = res.results["福利"];
						this.showCardSwiper = this.meiziList.length >= 3;
						this.dataList = [];
						for (let key in res.results) {
							if (key != "福利") {
								res.results[key].map(item => {
									if (item.images && item.images.length > 0) {
										item.imageUrl = item.images[0].replace("large", "small"); //加载新浪图床的缩略图
									}
								})
								let item = {
									name: key,
									data: res.results[key]
								}
								this.dataList.push(item);
							}
						}
						this.loading = false;
					}).catch(e => {
						this.loading = false;
					})
			},
			/**
			 * 轮播切换
			 */
			cardSwiper(event) {
				this.cardCur = event.detail.current;
			},
			onItemClick(event) {
				let url = event.currentTarget.dataset.url;
				uni.navigateTo({
					url: `/pages/web/web?url=${encodeURIComponent(url)}`
				})
			},
			onMeiZiItemClick(event) {
				let url = event.currentTarget.dataset.url;
				uni.previewImage({
					urls: [url]
				})
			}
		}
	}
</script>

<style>
</style>
