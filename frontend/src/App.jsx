import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./screens/dashboard.jsx";
import Signin from "./screens/signin.jsx";
import Signup from "./screens/signup.jsx";
import Send from "./screens/send.jsx";


function App() {
  const token = localStorage.getItem('token')
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={token ? <Dashboard/> : <Signin />}/>
          <Route path="/dashboard" element={token ? <Dashboard/> : <Signin />}/> 
          <Route path="/signin" element={<Signin />}/> 
          <Route path="/signup" element={token ? <Dashboard/> : <Signup />}/> 
          <Route path="/send" element={<Send />}/> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
