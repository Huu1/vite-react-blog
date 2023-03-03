import { useRequest } from "ahooks";
import { useState } from "react";
import classNames from "classnames";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "./index.less";
import { Collapse, IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import Photo from "./components/Photo";

enum EPanel {
	background,
	size,
	photo,
	text,
	layer
}

type TPanel = { icon: JSX.Element; title: string; key: EPanel };

const PanelList: TPanel[] = [
	{
		icon: <AddBoxIcon />,
		title: "图片",
		key: EPanel.photo
	},
	{
		icon: <AddBoxIcon />,
		title: "画板",
		key: EPanel.size
	},
	{
		icon: <AddBoxIcon />,
		title: "图层",
		key: EPanel.layer
	},
	{
		icon: <AddBoxIcon />,
		title: "文字",
		key: EPanel.text
	},
	{
		icon: <AddBoxIcon />,
		title: "背景",
		key: EPanel.background
	}
];

const SiderBar = () => {
	const [activePanel, setActivePanel] = useState<TPanel>();
	const [open, setOpen] = useState(false);
	const wrapClassName = classNames("app-sider-bar", {
		open
	});

	const onPanelClick = (panel: TPanel) => {
		setActivePanel(panel);
		setOpen(true);
	};

	return (
		<>
			<div className={wrapClassName} id="app-sidebar">
				{PanelList.map(panel => (
					<div
						className={`panel ${activePanel?.key === panel.key ? "select" : ""}`}
						key={panel.key}
						onClick={() => onPanelClick(panel)}
					>
						<AddBoxIcon />
						<div>图片</div>
					</div>
				))}
			</div>
			<Collapse orientation="horizontal" in={open}>
				<div className="bg-white h-full w-80 flex flex-col">
					<div className="p-5 pb-3 flex justify-between items-center">
						<span>{activePanel?.title}</span>
						<IconButton size="small" onClick={() => setOpen(false)}>
							<KeyboardDoubleArrowLeftIcon />
						</IconButton>
					</div>
					<div className="flex-1">{activePanel?.key === EPanel.photo && <Photo />}</div>
				</div>
			</Collapse>
		</>
	);
};

export default SiderBar;
