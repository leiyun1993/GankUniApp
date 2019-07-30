<template name="classify">
	<view>
		<scroll-view scroll-y class="page" lower-threshold="60px" @scrolltolower="scrolltolower">
			<!-- title -->
			<cu-custom bgColor="bg-gradual-green" :isBack="false">
				<block slot="content">妹子</block>
			</cu-custom>
			<!-- content -->
			<view class="flex meizi-flex">
				<view class="flex-sub">
					<view class="meizi-img left-img radius shadow bg-white" :style="[{height:(index==0?190:240) + 'px'}]" v-for="(item,index) in listLeft" :key="index+item.desc" @tap="onItemClick" :data-url="item.url">
						<image class="img radius" lazy-load="true" :src="item.url.replace('large','bmiddle')" mode="aspectFill"></image>
						<view class="img-desc">{{item.desc}}</view>
					</view>

				</view>
				<view class="flex-sub">
					<view class="meizi-img right-img radius shadow bg-white" v-for="(item,index) in listRight" :key="index+item.desc" @tap="onItemClick" :data-url="item.url">
						<image class="img radius" lazy-load="true" :src="item.url.replace('large','bmiddle')" mode="aspectFill"></image>
						<view class="img-desc">{{item.desc}}</view>
					</view>
				</view>
			</view>
			<view class="cu-load bg-white" v-if="showLoading" :class="loading?'loading':'over'"></view>

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
				loading: true,
				listLeft: [],
				listRight: [],
				page: 1
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList() {
				this.showLoading = true;
				api.get(`/data/福利/10/${this.page}`)
					.then(res => {
						let listLeft = [];
						let listRight = [];
						for (let i = 0; i < res.results.length; i++) {
							if (i % 2 == 0) {
								listLeft.push(res.results[i]);
							} else {
								listRight.push(res.results[i]);
							}
						}
						this.listLeft = this.page == 1 ? listLeft : this.listLeft.concat(listLeft);
						this.listRight = this.page == 1 ? listRight : this.listRight.concat(listRight);
						this.page++;

						if (res.results.length === 0) {
							this.loading = false;
						} else {
							this.showLoading = false;
						}
					}).catch(e => {
						if (this.page == 1) {
							this.listLeft = [];
							this.listRight = [];
						}
					})
			},
			scrolltolower() {
				if (!this.showLoading) {
					this.getList();
				}
			},
			onItemClick(event){
				let url = event.currentTarget.dataset.url;
				uni.previewImage({
					urls:[url]
				})
			}
		}
	}
</script>

<style>
	.meizi-img {
		width: 47vw;
		display: inline-block;
		height: 240px;
		position: relative;
	}

	.meizi-img.left-img {
		margin: 2vw 1vw 0vw 2vw;
	}

	.meizi-img.right-img {
		margin: 2vw 2vw 0vw 1vw;
	}

	.meizi-img image {
		width: 100%;
		height: 100%;
	}

	.meizi-flex {
		align-items: flex-start;
	}

	.img-desc {
		background-color: rgba(0, 0, 0, 0.4);
		width: 100%;
		padding: 15upx;
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
		text-align: center;
		border-bottom-left-radius: 6upx;
		border-bottom-right-radius: 6upx;
	}
</style>
