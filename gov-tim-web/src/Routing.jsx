import {RouterProvider, Outlet, createBrowserRouter} from "react-router-dom"
import Root from './Root'
import Home from './Home'
import Error404 from './Error404'
import CV from './CV'

const router = createBrowserRouter([
    {
	    path: '/',
	    element:  <Root><Outlet/></Root>,
	    children: [
	        {
		        path: '',
		        element: <Home />
	        },
            {
                path: '/cv',
                element: <CV />
            },
            {
                path: '*',
                element: <Error404 />
            }
     	]
    }
])

function App() {
    return <RouterProvider router={router}/>
}

export default App
