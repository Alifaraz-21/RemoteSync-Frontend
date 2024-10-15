import { useRoutes } from "react-router";
import routes from "./routes";

function App() {
  const element = useRoutes(routes);  // Create elements based on the current route
  return <>{element}</>;  // Render the elements
}

export default App;
