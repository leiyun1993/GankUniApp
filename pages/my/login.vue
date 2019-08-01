<template>
	<view class="login-page">
		<view class="">
			<view class="radius bg-white shadow login-box padding" style="padding-bottom: 60upx;">
				<view class="cu-item solid-bottom">
					<view class="flex">
						<text class="cuIcon-my text-black text-df"></text>
						<input type="text" class="text-ABC text-black login-input text-df" placeholder="请输入用户名或邮箱" :value="userName" @input="nameInput"/>
					</view>
				</view>
				<view class="cu-item">
					<view class="flex">
						<text class="cuIcon-lock text-black text-df"></text>
						<input type="password" class="text-black login-input text-df" placeholder="请输入密码" :value="password"  @input="pswInput"/>
					</view>
				</view>
			</view>
		</view>
		<view class="login-btn shadow radius" @tap="loginClick">LOGIN</view>
		<view class="" style="text-align: center;">
			<view class="" style="width: 70vw;display: inline-block;">
				<view class="flex or-box">
					<view class="flex-sub login-line-left">

					</view>
					<text class="text-df" style="color: #FFFFFF;padding: 0 30upx;">Or</text>
					<view class="flex-sub login-line-right">

					</view>
				</view>
			</view>
		</view>
		<view class="" style="text-align: center;margin-top: 50upx;">
			<text class="cuIcon-github bg-white shadow login-github" @tap="loginGitHub"></text>
		</view>
		<view class="login-tips">请输入GitHub账号密码或者浏览器中授权登录</view>
	</view>
</template>

<script>
	export default{
		data:()=>{
			return{
				userName:"",
				password:""
			}
		},
		methods:{
			nameInput(event){
				this.userName = event.detail.value;
			},
			pswInput(event){
				this.password = event.detail.value;
			},
			loginGitHub(){
				this.loginClick(false);
			},
			loginClick(isUserName=true){
				if(isUserName&&!this.userName){
					uni.showToast({
						icon:"none",
						title:"请输入用户名或邮箱"
					})
					return
				}
				if(isUserName&&!this.password){
					uni.showToast({
						icon:"none",
						title:"请输入密码"
					})
					return
				}
				uni.showLoading({
					title:"登录中..."
				})
				setTimeout(function() {
					uni.hideLoading();
					uni.showToast({
						icon:"success",
						title:"模拟登录成功"
					})
					uni.setStorageSync("userInfo",{
						name:"Gank妹子",
						avatar:"https://hbimg.huabanimg.com/621034b37c53ffc81f5d6a23ae1226d5c67e2b9628267-BYuZLo_fw658",
						remark:"这只是模拟登录"
					})
					uni.navigateBack({
						delta:1
					})
				}, 1000);
			}
		}
	}
</script>

<style>
	.login-page {
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(135deg, #eda2a4, #0078d7);
		text-align: center;
	}

	.login-box {
		display: inline-block;
		width: 70vw;
		margin-top: 20vh;
	}

	.login-box .login-input {
		text-align: left;
		line-height: 100upx;
		height: 100upx;
		padding: 10upx;
		flex: 1;
	}

	.login-btn {
		padding: 20upx 50upx;
		background-image: linear-gradient(135deg, #0078d7, #eda2a4);
		font-weight: 800;
		font-size: 32upx;
		display: inline-block;
		color: #FFFFFF;
		position: relative;
		top: -42upx;
	}

	.or-box {
		width: 70vw;
	}

	.login-line-left {
		height: 4upx;
		background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), #fff);
	}

	.login-line-right {
		height: 4upx;
		background-image: linear-gradient(270deg, rgba(255, 255, 255, 0), #fff);
	}

	.login-github {
		color: #333333;
		font-size: 50upx;
		border-radius: 50%;
		border: 10upx solid #FFFFFF;
	}

	.login-tips {
		color: #FFFFFF;
		font-size: 18upx;
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		padding: 10upx;
	}
</style>
