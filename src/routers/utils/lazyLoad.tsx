import CircularProgress from "@mui/material/CircularProgress";
import React, { Suspense } from "react";

function Spinner() {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<CircularProgress />
		</div>
	);
}

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
	return (
		<Suspense fallback={<Spinner />}>
			<Comp />
		</Suspense>
	);
};

export default lazyLoad;
