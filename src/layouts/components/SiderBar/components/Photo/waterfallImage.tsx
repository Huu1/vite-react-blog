import LazyImage from "@/components/LayImage/ImageLazy";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { memo } from "react";
import Masonry from "react-masonry-css";

const waterfallImage = memo((props: { imageList: any[]; loading: boolean }) => {
	return (
		<>
			<Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
				{props.imageList.map((image, index) => {
					const {
						user,
						urls: { small }
					} = image;

					return (
						<div key={index} className="item select-none">
							<LazyImage className="card-img-top " datasrc={small} key={index} />
							<div className="info text-center">
								Photo by <span>{user.name}</span> on
								<span>Unsplash</span>
							</div>
						</div>
					);
				})}
			</Masonry>
			{props.loading && (
				<Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
					<CircularProgress />
				</Box>
			)}
		</>
	);
});
waterfallImage.displayName = "waterfallImage";
export default waterfallImage;
