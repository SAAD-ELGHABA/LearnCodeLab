import { RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Router from "././route/Router";
function App() {
  return (
    <>
      <RouterProvider router={Router}>
        <Navbar />
      </RouterProvider>
    </>
  );
}

export default App;
