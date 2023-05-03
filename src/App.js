import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {NormalizeStyles} from "./shared/NormalizeStyles";
import Search  from "./screens/Search";
import Details  from "./screens/Details";
import NotFound from "./screens/NotFound";
import Header from "./components/Header/Header";
import Axios from "axios";
import {configure} from "axios-hooks";
import 'react-loading-skeleton/dist/skeleton.css';

// Configuração do Axios Hooks, ele já faz a chamada e me dá o status de caregamento, erro e sucesso
const axios = Axios.create({
  baseURL : `${process.env.REACT_APP_SUPER_HERO_API_BASE_URL}/${process.env.REACT_APP_SUPER_HERO_API_KEY}`,
});

configure({axios});

// aqui acaba a configuração do axios-hooks

const router = createBrowserRouter([
{
  path: "/",
  element: <Search/>
},
{
  path: "/details/:id",
  element: <Details/>
},
{
  path: "*",
  element: <NotFound/>
}
]);

function APP(){
  return(
    <>
    <NormalizeStyles />
    <Header />
    <RouterProvider router={router}/>;
    </>
  );
}

export default APP;
