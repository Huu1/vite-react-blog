import { Outlet } from "react-router-dom";
import LayoutHeader from "./components/Header";
import LayoutFooter from "./components/Footer";
import "./index.less";

const LayoutIndex = () => {
	return (
		// 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
		<section className="container">
			<div>
				<LayoutHeader></LayoutHeader>
				<Outlet></Outlet>
				<LayoutFooter></LayoutFooter>
			</div>
		</section>
	);
};

export default LayoutIndex;
