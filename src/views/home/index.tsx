import Button from "@mui/material/Button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import Konva from "konva";

import "./index.less";
import { calcMaxScale } from "@/utils";

const backgroundSizeInit = {
	width: 640,
	height: 320
};

const calcStagePosition = (
	stageSize: { width: number; height: number },
	oldScale: number,
	newScale: number,
	stagePosition: { x: number; y: number }
) => {
	const mousePointTo = {
		x: stageSize.width / 2 / oldScale - stagePosition.x / oldScale,
		y: stageSize.height / 2 / oldScale - stagePosition.y / oldScale
	};

	let x = -(mousePointTo.x - stageSize.width / 2 / newScale) * newScale;
	let y = -(mousePointTo.y - stageSize.height / 2 / newScale) * newScale;
	return { x, y };
};

const STAGE_PADDING = {
	height: 80,
	width: 40
};

const Home = () => {
	const wrapRef = useRef<HTMLDivElement>(null!);
	const stageRef = useRef<Konva.Stage>();

	// 舞台尺寸
	const [stageSize, setStagesize] = useState({ width: 0, height: 0 });
	// 舞台原点
	const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
	// 白板尺寸
	const [backgroundSize, setBackgroundSize] = useState(backgroundSizeInit);
	// 舞台比例
	const [scale, setScale] = useState(1);

	useLayoutEffect(() => {
		setStagesize({
			width: wrapRef.current.clientWidth,
			height: wrapRef.current.clientHeight
		});
	}, []);

	useEffect(() => {
		const stageSize = {
			width: wrapRef.current.clientWidth,
			height: wrapRef.current.clientHeight
		};
		const scale = calcMaxScale(backgroundSize, {
			width: stageSize.width - STAGE_PADDING.width,
			height: stageSize.height - STAGE_PADDING.height
		});
		setScale(scale);
		const pos = calcStagePosition(stageSize, 1, scale, { x: 0, y: 0 });
		setStagePos(pos);
	}, [backgroundSize]);

	const changeScale = (val: number) => {
		let stageWidth = stageSize.width;
		let stageHieight = stageSize.height;

		const scaleBy = 1.1;
		const stage = stageRef.current!;
		const oldScale = stage.scaleX();

		const newScale = val > 0 ? oldScale * scaleBy : oldScale / scaleBy;
		setScale(newScale);

		let newStageSize;
		//  大于舞台宽度
		if (newScale * backgroundSize.width + STAGE_PADDING.width > wrapRef.current.clientWidth) {
			newStageSize = {
				width: newScale * backgroundSize.width + STAGE_PADDING.width,
				height: stageHieight
			};
		}
		// 小于舞台宽度并且舞台宽度没有增加过
		if (
			wrapRef.current.clientWidth != stageSize.width &&
			newScale * backgroundSize.width + STAGE_PADDING.width < wrapRef.current.clientWidth
		) {
			newStageSize = {
				width: wrapRef.current.clientWidth,
				height: stageHieight
			};
		}
		if (newScale * backgroundSize.height + STAGE_PADDING.height > wrapRef.current.clientHeight) {
			newStageSize = {
				height: newScale * backgroundSize.height + STAGE_PADDING.height,
				width: newStageSize?.width ?? stageWidth
			};
		}
		if (
			wrapRef.current.clientHeight != stageSize.height &&
			newScale * backgroundSize.height + STAGE_PADDING.height < wrapRef.current.clientHeight
		) {
			newStageSize = {
				height: wrapRef.current.clientHeight,
				width: newStageSize?.width ?? stageWidth
			};
		}
		if (newStageSize) {
			setStagesize(newStageSize);
			const pos = calcStagePosition(newStageSize, 1, newScale, { x: 0, y: 0 });
			setStagePos(pos);
			if (newStageSize.height + STAGE_PADDING.height > wrapRef.current.clientHeight) {
				wrapRef.current.classList.add("show-y-scroll");
			} else {
				wrapRef.current.classList.remove("show-y-scroll");
			}
		} else {
			console.log("not change newStageSize");
			const pos = calcStagePosition(
				{
					width: stageWidth,
					height: stageHieight
				},
				oldScale,
				newScale,
				{ x: stage.x(), y: stage.y() }
			);
			setStagePos(pos);
		}
	};

	console.log(stagePos);

	return (
		<div className="flex-1 flex flex-col">
			<div className=" h-12 ">
				<Button
					variant="contained"
					onClick={() => {
						changeScale(1);
					}}
				>
					+
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						changeScale(-1);
					}}
				>
					-
				</Button>
			</div>
			<div className="workspace-container">
				<div className="workspace-inner" ref={wrapRef}>
					<Stage
						scaleX={scale}
						scaleY={scale}
						x={stagePos.x}
						y={stagePos.y}
						width={stageSize.width}
						height={stageSize.height}
						className="relative"
						ref={stageRef as React.LegacyRef<Konva.Stage>}
						style={{ width: stageSize.width, height: stageSize.height }}
					>
						<Layer>
							<Rect
								x={stageSize.width / 2}
								y={stageSize.height / 2}
								width={backgroundSize.width}
								height={backgroundSize.height}
								offset={{
									x: backgroundSize.width / 2,
									y: backgroundSize.height / 2
								}}
								fill={"white"}
							/>
							<Circle draggable x={1000} y={500} radius={80} fill="red" />
						</Layer>
					</Stage>
				</div>
			</div>
		</div>
	);
};

export default Home;
