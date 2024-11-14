import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Layout from "../layout";
import Boards from "../pages/Boards";
import Analytics from "../pages/Analytics";
import Notifications from "../pages/Notifications";
import Workflows from "../pages/Workflows";
import Home from "../pages/Home";
import Projects from "../pages/Projects";




const routes = [
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Home",
    element: <Layout />,
    children: [
      {
        path: "", // This renders Boards at /Home
        element: <Home />,
      },
      {
        path: "boards", // This renders Boards at /Home
        element: <Boards />,
      },
      {
        path: "analytics", // This renders Analytics at /Home/analytics
        element: <Analytics />,
      },
      {
        path: "notifications", // This renders Analytics at /Home/analytics
        element: <Notifications />,
      },
      {
        path: "workflows", // This renders Analytics at /Home/analytics
        element: <Workflows />,
      },
      {
        path: "projects", // This renders Analytics at /Home/analytics
        element: <Projects />,
      },
      
    ],
  },
  
//   {
    
//     element: <Layout />,
//     children: [
//       {
//     path: "analytics", // This renders Analytics at /Home/analytics
//     element: <Analytics />,
//   },
// ],
// },
// {
    
//   element: <Layout />,
//   children: [
//     {
//   path: "notifications", // This renders Analytics at /Home/analytics
//   element: <Notifications />,
// },
// ],
// },
// {
    
//   element: <Layout />,
//   children: [
//     {
//   path: "workflows", // This renders Analytics at /Home/analytics
//   element: <Workflows />,
// },
// ],
// },

];

export default routes;
