import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";


interface AppRoute {
    title: string;
    url: string;
    page: React.FC;
}

const routes: AppRoute[] = [
    // { title: "Main page", url: "/", page: MainPage },
    { title: "Main page", url: "/:id", page: MainPage }
]

const Router: React.FC = () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route key={route.url} path={route.url} element={<route.page />} />
            ))}
        </Routes>
    )
}

export default Router;