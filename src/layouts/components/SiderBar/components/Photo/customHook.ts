import { useRequest } from "ahooks";
import { useSnackbar } from "notistack";
import { useEffect, useCallback, useRef, MutableRefObject, useState } from "react";
import { ACTIONTYPE, PAGE_ACTIONTYPE, TPagenitial } from "./reducer";

function CheckRequest(response: { ok: any; statusText: string | undefined; json: () => any }) {
	if (!response.ok) {
		const error: any = new Error(response.statusText);
		error.response = response;
		throw error;
	} else {
		return response.json();
	}
}

const fetchImage = (index: any, query: any) =>
	fetch(`${import.meta.env.VITE_POLOTNO_API}/get-unsplash?query=${query}&per_page=20&page=${index}&KEY=nFA5H9elEytDyPyvKL7T`, {
		method: "Get",
		headers: {
			Authorization: "Client-ID g0hjw__H3OZAnfkzXMs4GpZZ9MvTmLsRzRufJMQnljI"
		}
	})
		.then(CheckRequest)
		.then(({ results }) => results)
		.catch(e => {
			throw new Error(e.message);
		});

export const useImageFetch = (pagedData: TPagenitial, imgDispatch: React.Dispatch<ACTIONTYPE>) => {
	const { enqueueSnackbar } = useSnackbar();
	const { loading, run, error } = useRequest(fetchImage, {
		cacheKey: "cacheKey-demo",
		manual: true,
		onSuccess(data) {
			imgDispatch({ type: "STACK_IMAGES", payload: data ?? [] });
		},
		onError(err) {
			enqueueSnackbar(err.message, {
				variant: "error"
			});
		}
	});

	useEffect(() => {
		if (pagedData.page !== 0) {
			run(pagedData.page, pagedData.query);
		}
	}, [pagedData]);
	return {
		loading,
		error
	};
};

export const useInfiniteScroll = (scrollRef: MutableRefObject<null>, dispatch: React.Dispatch<PAGE_ACTIONTYPE>) => {
	const scrollObserver = useCallback(
		(node: Element) => {
			new IntersectionObserver(entries => {
				entries.forEach(en => {
					if (en.intersectionRatio > 0) {
						dispatch({ type: "ADVANCE_PAGE" });
					}
				});
			}).observe(node);
		},
		[dispatch]
	);
	useEffect(() => {
		if (scrollRef.current) {
			scrollObserver(scrollRef.current);
		}
	}, [scrollObserver, scrollRef]);
};
