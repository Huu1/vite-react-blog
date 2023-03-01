import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutIndex from "@/layouts";
import lazyLoad from "./utils/lazyLoad";

const Home = lazy(() => {
	return Promise.all([import("@/views/home"), new Promise(resolve => setTimeout(resolve, 300))]).then(
		([moduleExports]) => moduleExports
	);
});

export default createBrowserRouter([
	{
		path: "/",
		element: <LayoutIndex />,
		children: [
			{
				path: "/",
				element: <Navigate to="home" />
			},
			{
				path: "home",
				element: lazyLoad(Home)
			}
		]
	},
	{
		path: "/404",
		element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/404")))
	}
]);
