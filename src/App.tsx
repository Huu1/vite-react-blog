import { BrowserRouter as Router } from "react-router-dom";
import Routers from "@/routers/index";
import AuthRouter from "./routers/utils/authRouter";

const App = () => {
	return (
		<Router>
			<AuthRouter>
				<Routers />
			</AuthRouter>
		</Router>
	);
};

export default App;
