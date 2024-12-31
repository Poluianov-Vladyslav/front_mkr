import React from "react"
import RegisterPage from "./components/RegisterPage"
import LoginPage from "./components/LogPage"
import LinkPage from "./components/LinkPage"
import ListLinkPage from "./components/ListLinkPage"
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

class App extends React.Component{

    router = createBrowserRouter([
        {
            path: "/",
            element: <RegisterPage />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/link",
            element: <LinkPage />,
        },
        {
            path: "/listlinks",
            element: <ListLinkPage />,
        }
    ]);
    render(){
        return(
            <RouterProvider router={this.router}/>
        )
    }
}

export default App