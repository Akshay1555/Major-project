import "./App.css";
import Register from "./Register";
import Login from "./Login";
import GoshalaPage from "./GoshalaPage";
import UpdateInfo from "./UpdateInfo";
import Nav from "./Nav";
import Home from "./Home";
import EmployeeRecords from "./EmployeeRecords";
//import Nav_Bar from './Nav_Bar';
// import Footer from './F'
import About from "./About";
import Goshalas from "./Goshalas";
import PrivateComponent from "./PrivateComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Certificate from "./Certificate";
const App = () => {
  return (
    // <Nav></Nav>
    <div className="App">
      <BrowserRouter>
      <Nav/>
 
{/* <Nav_Bar/> */}
        <Routes>

        <Route element={<PrivateComponent />}>  
       
          <Route path="/Register" element={<Register />}></Route> 
            <Route path="/EmployeeRecords" element={<EmployeeRecords />}></Route> 
            </Route>
           
            
          <Route path="/"  element={<Home />}></Route>
        
          <Route path="/UpdateInfo" element={<UpdateInfo />} /> 
          <Route path="/Certificate" element={<Certificate />}></Route>
          <Route path="/Goshalas" element={<Goshalas />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/GoshalaPage/:_id" element={<GoshalaPage/>}></Route>
          <Route path="/Login" element={<Login />}></Route>
         
        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </div>
  );
};

export default App;
