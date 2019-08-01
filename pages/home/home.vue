<template name="home">
	<view>
		<!-- content -->
		<!-- 妹子图 -->
		<swiper v-if="meiziList.length>0" :class="!showCardSwiper?'screen-swiper':'card-swiper'" :indicator-dots="false"
		 :circular="true" :autoplay="true" interval="5000" duration="500" @change="cardSwiper">
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
			<view v-for="(citem,cindex) in item.data" :key="cindex" class="cu-card dynamic no-card" @tap="onItemClick" :data-url="citem.url">
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

		<!-- 底部占位 -->
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import api from "../../api/api.js";
	export default {
		data() {
			return {
				showCardSwiper: true,
				cardCur: 0,
				meiziList: [],
				dataList: [],
			}
		},
		components: {
		},
		mounted() {
			this.getStorageData();
			this.getTodayInfo();
		},
		methods: {
			getStorageData() {
				this.meiziList = uni.getStorageSync("homeMeiZiList") || [];
				this.dataList = uni.getStorageSync("homeDataList") || [];
			},
			getTodayInfo() {
				api.get("/today")
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
						uni.setStorageSync("homeDataList", [this.dataList[0]]);
						uni.setStorageSync("homeMeiZiList", this.meiziList);

						console.log(this.meiziList.length >= 3)
					}).catch(e => {
						console.log(e)
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
	.page {
		height: 100vh;
	}

	.text-content {
		margin-top: 20upx;
	}

	.flex {
		align-items: center;
	}

	.item-image {
		margin-left: 30upx;
		width: 100upx;
		height: 100upx;
	}
</style>
