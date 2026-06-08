import App from "../App";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Men from "../Pages/Men";
import Kids from "../Pages/Kids";
import Women from "../Pages/Women";
import Products from "../Pages/Products";
import Contact from "../Pages/Contact";
import Cart from "../Pages/Cart";
import Wishlist from "../Pages/Wishlist";
import NewArrivals from "../Pages/NewArrivals";
import Perfume from "../Pages/Perfume";
import Shoes from "../Pages/Shoes";
import Accessories from "../Pages/Accessories";
import Premium from "../Pages/Premium";
import Profile from "../Pages/Profile";
import Detail from "../Pages/Detail";
import CheckOut from "../Pages/checkOut";
import Order from "../Pages/Order";
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




