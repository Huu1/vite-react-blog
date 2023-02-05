/* themeConfigProp */
export interface ThemeConfigProp {
	isDark: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	language: string;
	themeConfig: ThemeConfigProp;
}
