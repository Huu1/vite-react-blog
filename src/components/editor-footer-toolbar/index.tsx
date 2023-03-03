import React from "react";
import PanToolIcon from "@mui/icons-material/PanTool";
import NavigationSharpIcon from "@mui/icons-material/NavigationSharp";
import "./index.less";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ZoomInSharpIcon from "@mui/icons-material/ZoomInSharp";
import ZoomOutSharpIcon from "@mui/icons-material/ZoomOutSharp";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";

type TTool = {
	scale: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onZoomChange: (t: number) => void;
};

const EditorFootToolBar = (props: TTool) => {
	const [alignment, setAlignment] = React.useState("left");
	const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
		if (newAlignment !== null) {
			setAlignment(newAlignment);
		}
	};
	return (
		<div className=" editor-foot-toolBar">
			<ToggleButtonGroup
				className=" absolute left-8 bottom-8 z-10"
				value={alignment}
				exclusive
				size="small"
				onChange={handleAlignment}
				aria-label="text alignment"
			>
				<ToggleButton size="small" value="left" aria-label="left aligned">
					<PanToolIcon fontSize={"small"} />
				</ToggleButton>
				<ToggleButton size="small" value="center" aria-label="centered">
					<NavigationSharpIcon fontSize={"small"} />
				</ToggleButton>
			</ToggleButtonGroup>

			<div className="absolute left-40 bottom-8 z-10 flex items-center justify-center">
				<IconButton onClick={props.onZoomOut}>
					<ZoomOutSharpIcon />
				</IconButton>
				<Slider
					aria-label="Volume"
					size="small"
					value={props.scale}
					min={0.1}
					max={2.4}
					step={0.01}
					onChange={(e, v: any) => props.onZoomChange(v)}
					sx={{
						width: 200
					}}
				/>
				<IconButton onClick={props.onZoomIn}>
					<ZoomInSharpIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default EditorFootToolBar;
