
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Logedin from './Pages/Logedin';

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
