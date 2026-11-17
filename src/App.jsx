import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Bmi from "./pages/Bmi"
import Bmr from "./pages/Bmr"
import Car from "./pages/Car"
import Buffet from "./pages/Buffet"
export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/bmi" element={<Bmi/>}/>
      <Route path="/bmr" element={<Bmr/>}/>
      <Route path="/car" element={<Car/>}/>
      <Route path="/buffet" element={<Buffet />} />

    </Routes>
    </BrowserRouter>
      
    </>
  )
}
