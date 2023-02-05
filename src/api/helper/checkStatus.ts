/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
	switch (status) {
		case 401:
			console.error("登录失效！请您重新登录");
			break;
		case 404:
			console.error("你所访问的资源不存在！");
			break;
		case 500:
			console.error("服务异常！");
			break;
		default:
			console.error("请求失败！");
	}
};
