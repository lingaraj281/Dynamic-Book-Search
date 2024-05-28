import Search from './components/Search'
import './App.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dummy from './components/Dummy';
import Home from './components/Home';
function App() {
  const router = createBrowserRouter([
    {
      path:"/Search",
      element:<Search/>
    },
    {
      path:"/new",
      element:<Dummy/>
    },
    {
      path:"/",
      element:<Home/>
    },

  ])
  return (
    <>
        <RouterProvider router = {router}/>
    </>
  )
}

export default App


