import {Route, Routes} from "react-router-dom";
import NotFound from "./templates/notFound";
import Form from "./templates/form";
import Home from "./templates/home";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/form" element={<Form/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
