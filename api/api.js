"use strict"
let get = (url) => new Promise((resolve, reject) => {
	uni.request({
		url: `http://gank.io/api${url}`,
		method: "GET",
		success: (res) => {
			if (res.statusCode === 200) {
				if (!res.data.error) {
					resolve(res.data);
				} else {
					reject(res.data.error);
				}
			} else {
				reject(res.errMsg);
			}
		},
		fail: (e) => {
			reject("网络异常！");
		}
	})
});
let post = (url, params) => new Promise((resolve, reject) => {
	uni.request({
		url: `http://gank.io/api${url}`,
		method: "POST",
		data: params,
		header: {
			"content-type": "application/x-www-form-urlencoded" // 默认值
		},
		success: (res) => {
			if (res.statusCode === 200) {
				if (!res.data.error) {
					resolve(res.data);
				} else {
					reject(res.data.error);
				}
			} else {
				reject(res.errMsg);
			}
		},
		fail: (e) => {
			reject("网络异常！");
		}
	})
});
module.exports = {
	get,
	post
}
