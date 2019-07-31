<template>
	<view class="">
		<scroll-view scroll-y class="page" lower-threshold="60px" @scrolltolower="scrolltolower">
			<cu-custom bgColor="bg-gradual-green" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">干货历史</block>
			</cu-custom>

			<view class="history-item" v-for="(item,index) in dataList" :key="index" @tap="onItemClick" :data-index="index">
				<image class="bg-white shadow" :src="item.imageUrl" mode="aspectFill"></image>
				<view class="item-mask">
					<view class="time">{{item.date}}</view>
					<view class="hot">{{item.title}}</view>
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
				page: 1
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList() {
				this.showLoading = true;
				api.get(`/history/content/10/${this.page}`)
					.then(res => {
						console.log(res.results);
						let exp = new RegExp('src=\"(.+?)\"');
						res.results.map(item => {
							item.imageUrl = exp.exec(item.content)[1];
							item.imageUrl = item.imageUrl.replace("large", "mw690");
							item.date = util.formatDate(new Date(item.publishedAt));
						})

						this.dataList = this.page == 1 ? res.results : this.dataList.concat(res.results);
						if (res.results.length < 10) {
							this.loading = false;
						} else {
							this.showLoading = false;
							this.page++;
						}
					}).catch(e => {
						console.log(e);
						if (this.page == 1) {
							this.dataList = [];
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
				let index = event.currentTarget.dataset.index;
				let item = this.dataList[index];
				uni.navigateTo({
					url: `/pages/my/detail?date=${item.date}`
				})
			}
		}
	}
</script>

<style>
	.history-item {
		width: 92vw;
		margin: 30upx 4vw;
		position: relative;
	}

	.history-item image {
		width: 100%;
		height: 340upx;
		border-radius: 12upx;
	}

	.history-item .item-mask {
		background-color: rgba(0, 0, 0, 0.2);
		width: 100%;
		height: 340upx;
		border-radius: 12upx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.item-mask .time {
		position: absolute;
		left: 30upx;
		top: 130upx;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 32upx;
	}

	.item-mask .hot {
		position: absolute;
		left: 30upx;
		top: 180upx;
		color: #FFFFFF;
		font-size: 28upx;
	}
</style>
