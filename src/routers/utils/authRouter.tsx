/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
	// * 当前账号有权限返回 Router，正常访问页面
	return props.children;
};

export default AuthRouter;
