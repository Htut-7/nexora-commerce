import App from "../App";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Men from "../pages/Men";
import Kids from "../pages/Kids";
import Women from "../pages/Women";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import NewArrivals from "../pages/NewArrivals";
import Perfume from "../pages/Perfume";
import Shoes from "../pages/Shoes";
import Accessories from "../pages/Accessories";
import Premium from "../pages/Premium";
import Profile from "../pages/Profile";
import Detail from "../pages/Detail";
import CheckOut from "../pages/checkOut";
import Order from "../pages/Order";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";

export default function Router(){

  const {authReady,user}=useContext(AuthContext);

  const isAuthenticated=!!user

  const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:'',
        element: isAuthenticated ? <Home/> : <Navigate to='/login'/>
      },
      {
        path: '/login',
        element: !isAuthenticated ? <Login/> : <Navigate to='/'/>
      },
      {
        path: '/register',
        element: !isAuthenticated ?<Register/> :  <Navigate to='/'/>
      },
      {
        path: '/men',
        element: isAuthenticated ? <Men/> : <Navigate to='/login'/>
      },
      {
        path: '/women',
        element: isAuthenticated ? <Women/> : <Navigate to='/login'/>
      },
      {
        path: '/kids',
        element: isAuthenticated ? <Kids/> : <Navigate to='/login'/>
      },
      {
        path: '/products',
        element: isAuthenticated ? <Products/> : <Navigate to='/login'/>
      },
      {
        path: '/contact',
        element: isAuthenticated ? <Contact/> : <Navigate to='/login'/>
      },
      {
        path: '/cart',
        element: isAuthenticated ? <Cart/> : <Navigate to='/login'/>
      },
      {
        path: '/wishlist',
        element: isAuthenticated ? <Wishlist/> : <Navigate to='/login'/>
      },
      {
        path: '/newarrival',
        element: isAuthenticated ? <NewArrivals/> : <Navigate to='/login'/>
      },
      {
        path: '/perfume',
        element: isAuthenticated ? <Perfume/> : <Navigate to='/login'/>
      },
      {
        path: '/shoes',
        element: isAuthenticated ? <Shoes/> : <Navigate to='/login'/>
      },
      {
        path: '/accessories',
        element: isAuthenticated ? <Accessories/> : <Navigate to='/login'/>
      },
      {
        path: '/premium',
        element: isAuthenticated ? <Premium/> : <Navigate to='/login'/>
      },
      {
        path: '/profile',
        element: isAuthenticated ? <Profile/> : <Navigate to='/login'/>
      },
      {
        path: '/detail/:id',
        element: isAuthenticated ? <Detail/> : <Navigate to='/login'/>
      },
      {
        path: '/checkout',
        element: isAuthenticated ? <CheckOut/> : <Navigate to='/login'/>
      },
      {
        path: '/order',
        element: isAuthenticated ? <Order/> : <Navigate to='/login'/>
      }
    ]
  },
]);

  return(
     authReady && <RouterProvider router={router} /> 
  )

}




