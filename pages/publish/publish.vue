<template>
	<view>
		<scroll-view scroll-y class="page">
			<!-- content -->
			<view class="cu-form-group margin-top">
				<view class="title">网址</view>
				<input placeholder="请输入干货的网址" name="input" :value="params.url" @input="input" data-key="url"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">描述</view>
				<input placeholder="请输入干货的简要描述" name="input" :value="params.desc" @input="input" data-key="desc"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">昵称</view>
				<input placeholder="请输入干货的署名" name="input" :value="params.who" @input="input" data-key="who"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">分类</view>
				<picker @change="PickerChange" :value="index" :range="picker" range-key="name">
					<view class="picker">
						{{index>-1?picker[index].name:'请选择干货分类'}}
					</view>
				</picker>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" style="width: 100%;" @tap="submitClick">提交</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from "../../api/api.js";
	export default {
		data: () => {
			return {
				index: -1,
				picker: [{
						name: "瞎推荐",
						category: "瞎推荐"
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
						name: "拓展资源 ",
						category: "拓展资源"
					},
					{
						name: "休息视频 ",
						category: "休息视频"
					},
					{
						name: "福利",
						category: "福利"
					}
				],
				params: {
					url: "",
					desc: "",
					who: "",
					type: "",
					debug: true
				}
			}
		},
		methods: {
			submitClick() {
				if (!this.params.url) {
					uni.showToast({
						icon: "none",
						title: "请输入干货的网址"
					})
					return
				}
				if (!this.params.desc) {
					uni.showToast({
						icon: "none",
						title: "请输入干货的简要描述"
					})
					return
				}
				if (!this.params.who) {
					uni.showToast({
						icon: "none",
						title: "请输入干货的署名"
					})
					return
				}
				if (this.index == -1) {
					uni.showToast({
						icon: "none",
						title: "请选择干货分类"
					})
					return
				}
				this.params.type = this.picker[this.index].category;
				uni.showLoading({
					title: "提交中..."
				})
				api.post("/add2gank", this.params)
					.then(res => {
						uni.showToast({
							icon: "none",
							title: "提交成功~"
						})
						uni.hideLoading();
						wx.navigateBack({
							delta: 1
						})
					}).catch(e => {
						uni.showToast({
							icon: "none",
							title: e
						})
						uni.hideLoading();
					})
			},
			input(event) {
				let key = event.currentTarget.dataset.key;
				let value = event.detail.value;
				this.params[key] = value;
			},
			PickerChange(event) {
				this.index = event.detail.value;
			}
		}
	}
</script>

<style>
</style>
