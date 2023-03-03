export type TPagenitial = {
	page: number;
	query: string;
};
export type TImgInitial = {
	images: any[];
};

export const PagenitialState: TPagenitial = { page: 0, query: "" };
export const initialState: TImgInitial = { images: [] };

export type PAGE_ACTIONTYPE = { type: "ADVANCE_PAGE" } | { type: "ADVANCE_QUERY"; payload: string } | { type: "RESET_PAGE" };
export type ACTIONTYPE = { type: "STACK_IMAGES"; payload: any[] } | { type: "RESET_IMAGES" };

export const pageReducer = (state: typeof PagenitialState, action: PAGE_ACTIONTYPE) => {
	switch (action.type) {
		case "ADVANCE_PAGE":
			return { ...state, page: state.page + 1 };
		case "ADVANCE_QUERY":
			return { ...state, query: action.payload };
		case "RESET_PAGE":
			return { ...state, page: 1 };
		default:
			return state;
	}
};

export const imgReducer = (state: typeof initialState, action: ACTIONTYPE) => {
	switch (action.type) {
		case "STACK_IMAGES":
			return { ...state, images: [...state.images, ...action.payload] };
		case "RESET_IMAGES":
			return { ...state, images: [] };
		default:
			throw new Error();
	}
};
