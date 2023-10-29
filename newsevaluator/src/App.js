import React from 'react';
import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Logedin from './Pages/Logedin';
import History from './Pages/History';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/logedin",
    element: <Logedin/>
  },
  {
    path:"/history",
    element:<History/>
  }
]);
function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>

  );
}

export default App;
