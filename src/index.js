import reactDom from "react-dom";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/login";
import Root from "./components/root";
import SignUp from "./components/sign-up";
const root = document.querySelector('.root');
export default function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root/>}/>
            <Route path="/sign-in" element={<Login/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
        </Routes>
        </BrowserRouter>
    )
}
reactDom.render(<App/>, root); 