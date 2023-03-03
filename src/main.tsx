import ReactDOM from "react-dom/client";
import "@/styles/index.less";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import App from "@/App";
import NotistackWrapper from "./context/SnackbarProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<NotistackWrapper>
				<App />
			</NotistackWrapper>
		</PersistGate>
	</Provider>
);
