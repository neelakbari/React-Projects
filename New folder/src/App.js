import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//pages
import Home from "./pages/Home";
import About from "./pages/About";
import RootLayout from "./Components/RootLayout";
import HelpLayout from "./Components/HelpLayout";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import CareerLayout from "./Components/CareerLayout";
import Career, { careersLoader } from "./pages/Career";
import CareerDetails, { careerDetailsLoader } from "./pages/CareerDetails";
import CareerError from "./pages/CareerError";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="help" element={<HelpLayout />}>
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="careers" element={<CareerLayout />}>
          <Route index element={<Career/>} loader={careersLoader}/>
          <Route path=":careerId" element={<CareerDetails/>} loader={careerDetailsLoader} errorElement={<CareerError/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
