import { Outlet } from "react-router-dom";
import SiderBar from "./components/SiderBar";
import TopBar from "./components/TopBar";
import "./index.less";

const LayoutIndex = () => {
	return (
		<div className="h-screen flex flex-col">
			<TopBar></TopBar>
			<div className="flex-1 flex ">
				<SiderBar></SiderBar>
				<div className="flex-1 flex flex-col">
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default LayoutIndex;
