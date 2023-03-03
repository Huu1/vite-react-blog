import React, { useCallback, useEffect, useRef } from "react";

type TImageLazy = {
	datasrc: string;
	className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function LazyImage(props: TImageLazy) {
	const { className, datasrc } = props;
	const imageRef = useRef<HTMLImageElement>(null);
	const Observer = useRef<IntersectionObserver>();

	const imgObserver = useCallback((node: Element) => {
		Observer.current = new IntersectionObserver(entries => {
			entries.forEach(en => {
				if (en.intersectionRatio > 0) {
					const currentImg = en.target as HTMLImageElement;
					const newImgSrc = currentImg.dataset.src;
					if (!newImgSrc) {
						console.error("Image src is invalid");
					} else {
						currentImg.src = newImgSrc;
					}
					Observer.current?.unobserve(node);
				}
			});
		});
		Observer.current.observe(node);
	}, []);

	useEffect(() => {
		imgObserver(imageRef.current!);
		return () => {
			Observer.current?.disconnect();
		};
	}, [imgObserver]);

	return <img {...props} ref={imageRef} className={`image-lazy ${className}`} data-src={datasrc} />;
}
