import {Route, Routes} from "react-router-dom";
import NotFound from "./templates/NotFound";
import Form from "./templates/Form";
import Home from "./templates/Home";
import Header from "./components/Header";
import CurrentForm from "./templates/CurrentForm";


function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/form" element={<Form/>}/>
                <Route path="/answer/:id" element={<CurrentForm/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
