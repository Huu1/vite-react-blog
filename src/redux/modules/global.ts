import { GlobalState } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const globalState: GlobalState = {
	token: "",
	userInfo: "",
	language: "",
	themeConfig: {
		isDark: false
	}
};

const globalSlice = createSlice({
	name: "global",
	initialState: globalState,
	reducers: {
		setToken(state: GlobalState, { payload }: PayloadAction<string>) {
			state.token = payload;
		},
		setDark(state: GlobalState, { payload }: PayloadAction<boolean>) {
			state.themeConfig.isDark = payload;
		}
	}
});

export const { setToken, setDark } = globalSlice.actions;
export default globalSlice.reducer;
