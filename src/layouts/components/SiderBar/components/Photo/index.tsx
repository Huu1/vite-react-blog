import { useMemo, useReducer, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { useImageFetch, useInfiniteScroll } from "./customHook";
import { useDebounce } from "ahooks";
import { ACTIONTYPE, imgReducer, initialState, PagenitialState, pageReducer, PAGE_ACTIONTYPE } from "./reducer";
import WaterfallImage from "./waterfallImage";
import Alert from "@mui/material/Alert";
import "./index.css";

/**
 *
 * @param props 触底滚动
 * @returns
 */
const InfiniteScrollBox = (props: { pagerDispatch: React.Dispatch<PAGE_ACTIONTYPE>; children: React.ReactNode }) => {
	const bottomBoundaryRef = useRef(null);
	useInfiniteScroll(bottomBoundaryRef, props.pagerDispatch);
	return (
		<div className="overflow-auto pl-2" style={{ height: "calc(100vh - 172px)" }}>
			{props.children}
			<div id="page-bottom-boundary" style={{ border: "1px solid red", opacity: 0 }} ref={bottomBoundaryRef}></div>
		</div>
	);
};

const SearchBox = (props: {
	query: any;
	pagerDispatch: React.Dispatch<PAGE_ACTIONTYPE>;
	imgDispatch: React.Dispatch<ACTIONTYPE>;
}) => {
	const { query, pagerDispatch, imgDispatch } = props;

	return (
		<Paper sx={{ display: "flex", alignItems: "center", p: "4px 4px" }}>
			<InputBase
				value={query}
				onChange={e => {
					pagerDispatch({ type: "ADVANCE_QUERY", payload: e.target.value });
					pagerDispatch({ type: "RESET_PAGE" });
					imgDispatch({ type: "RESET_IMAGES" });
				}}
				size="medium"
				sx={{ ml: 1, mb: -0.5, flex: 1, fontSize: 12 }}
				placeholder="搜索你想要的图片"
			/>
		</Paper>
	);
};

const Index = () => {
	const [imgData, imgDispatch] = useReducer(imgReducer, initialState);

	const [pager, pagerDispatch] = useReducer(pageReducer, PagenitialState);
	const debouncedPager = useDebounce(pager, { wait: 500 });

	const { loading, error } = useImageFetch(debouncedPager, imgDispatch);

	const imagesMemo = useMemo(() => imgData.images, [imgData.images]);

	return (
		<div className="h-full flex flex-col">
			<div className=" pb-4 px-4 pt-2">
				<SearchBox query={pager.query} pagerDispatch={pagerDispatch} imgDispatch={imgDispatch} />
			</div>
			<div className="flex-1 ">
				<InfiniteScrollBox pagerDispatch={pagerDispatch}>
					<WaterfallImage imageList={imagesMemo} loading={loading} />
					{error && !loading && (
						<Alert severity="error" className="mr-2 mt-4">
							{error.message}
						</Alert>
					)}
				</InfiniteScrollBox>
			</div>
		</div>
	);
};

export default Index;
