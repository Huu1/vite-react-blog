import Button from "@mui/material/Button";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import Konva from "konva";

import "./index.less";
import { calcMaxScale } from "@/utils";
import EditorFootToolBar from "@/components/editor-footer-toolbar";
import { KonvaEventObject } from "konva/lib/Node";

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
	height: 200,
	width: 40
};

const Home = () => {
	const wrapRef = useRef<HTMLDivElement>(null!);
	const containerRef = useRef<HTMLDivElement>(null!);
	const stageRef = useRef<Konva.Stage>();

	// 舞台尺寸
	const [stageSize, setStagesize] = useState({ width: 0, height: 0 });
	// 舞台原点
	const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
	// 白板尺寸
	const [backgroundSize, setBackgroundSize] = useState(backgroundSizeInit);
	// 舞台比例
	const [scale, setScale] = useState(1);

	useEffect(() => {
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

	const onMouseWheelHandle = (e: KonvaEventObject<WheelEvent>) => {
		e.evt.preventDefault();
		const scaleBy = 1.1;
		const stage = stageRef.current!;
		const oldScale = stage.scaleX();

		let stageWidth = stage.width();
		let stageHieight = stage.height();

		const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
		if (newScale <= 0.1 || newScale >= 2.4) {
			return;
		}
		setScale(newScale);
		const center = {
			x: stageWidth / 2,
			y: stageHieight / 2
		};

		const relatedTo = {
			x: (center.x - stage.x()) / oldScale,
			y: (center.y - stage.y()) / oldScale
		};

		const newPos = {
			x: center.x - relatedTo.x * newScale,
			y: center.y - relatedTo.y * newScale
		};
		setStagePos(newPos);
	};

	const onZoomIn = () => {
		const scaleBy = 1.1;
		const stage = stageRef.current!;
		const oldScale = stage.scaleX();

		let stageWidth = stage.width();
		let stageHieight = stage.height();

		const newScale = oldScale * scaleBy;
		if (newScale >= 2.4) {
			return;
		}
		setScale(newScale);
		const center = {
			x: stageWidth / 2,
			y: stageHieight / 2
		};

		const relatedTo = {
			x: (center.x - stage.x()) / oldScale,
			y: (center.y - stage.y()) / oldScale
		};

		const newPos = {
			x: center.x - relatedTo.x * newScale,
			y: center.y - relatedTo.y * newScale
		};
		setStagePos(newPos);
	};

	const onZoomOut = () => {
		const scaleBy = 1.1;
		const stage = stageRef.current!;
		const oldScale = stage.scaleX();

		let stageWidth = stage.width();
		let stageHieight = stage.height();

		const newScale = oldScale / scaleBy;

		if (newScale < 0.1) {
			return;
		}
		setScale(newScale);
		const center = {
			x: stageWidth / 2,
			y: stageHieight / 2
		};

		const relatedTo = {
			x: (center.x - stage.x()) / oldScale,
			y: (center.y - stage.y()) / oldScale
		};

		const newPos = {
			x: center.x - relatedTo.x * newScale,
			y: center.y - relatedTo.y * newScale
		};
		setStagePos(newPos);
	};

	const onZoomChange = (newScale: number) => {
		const stage = stageRef.current!;
		const oldScale = stage.scaleX();

		let stageWidth = stage.width();
		let stageHieight = stage.height();

		setScale(newScale);
		const center = {
			x: stageWidth / 2,
			y: stageHieight / 2
		};

		const relatedTo = {
			x: (center.x - stage.x()) / oldScale,
			y: (center.y - stage.y()) / oldScale
		};

		const newPos = {
			x: center.x - relatedTo.x * newScale,
			y: center.y - relatedTo.y * newScale
		};
		setStagePos(newPos);
	};

	return (
		<div className="flex-1 flex flex-col">
			<div className=" h-12 ">12</div>
			<div className="workspace-container " ref={containerRef}>
				<div className="workspace-inner overflow-hidden relative" ref={wrapRef}>
					<Stage
						scaleX={scale}
						scaleY={scale}
						x={stagePos.x}
						y={stagePos.y}
						onClick={e => {
							console.log(e.evt.x, e.evt.y);
						}}
						onWheel={onMouseWheelHandle}
						width={stageSize.width}
						height={stageSize.height}
						className="relative"
						ref={stageRef as React.LegacyRef<Konva.Stage>}
						style={{ width: stageSize.width, height: stageSize.height, background: "#f1f2f6" }}
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
							<Circle draggable x={600} y={400} radius={80} fill="green" />
						</Layer>
					</Stage>
					<EditorFootToolBar scale={scale} onZoomChange={onZoomChange} onZoomOut={onZoomOut} onZoomIn={onZoomIn} />
				</div>
			</div>
		</div>
	);
};

export default Home;
