export const calcMaxScale = (innerSize: { width: any; height: any }, outerSize: { width: any; height: any }) => {
	const { width: outerWidth, height: outerHeight } = outerSize;
	const { width: innerWidth, height: innerHeight } = innerSize;

	const scale = outerWidth / outerHeight > innerWidth / innerHeight ? outerHeight / innerHeight : outerWidth / innerWidth;

	return scale;
};
