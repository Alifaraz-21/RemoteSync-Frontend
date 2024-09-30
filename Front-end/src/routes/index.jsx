import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Layout from "../layout";
import Boards from "../pages/Boards";

const routes = [
  {
    
   
    path: "/",
    element: <Login />,
   
   
  },
  {
    path:"/Signup",
    element:<Signup/>
  },
  {
  
    path: "/Home",
    element:<Layout/>,
     children: [
      {
        children: [
          {
            path: "",
            element: <Boards />,
          },
        ],
      },
    ],
  },
];

export default routes;
