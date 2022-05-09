import reactDom from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { tokenContext } from "./assets/context/tokenContext";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import Home from "./components/home";
import NewDep from "./components/newDep";
import NewPay from "./components/newPay";
const root = document.querySelector(".root");
export default function App() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token"))
  );
  return (
    <BrowserRouter>
      <tokenContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/home" /> : <Navigate to="/sign-in" />
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/home/new-deposit" element={<NewDep/>} />
          <Route path="/home/new-payment" element={<NewPay/>}/>
        </Routes>
      </tokenContext.Provider>
    </BrowserRouter>
  );
}
reactDom.render(<App />, root);
