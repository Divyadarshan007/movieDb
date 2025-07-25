import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Login from "./pages/Login"
import AddMovie from "./pages/AddMovie"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/add-movie" element={<AddMovie/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App