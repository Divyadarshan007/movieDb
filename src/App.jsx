import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Login from "./pages/Login"
import AddMovie, { AppContext } from "./pages/AddMovie"
import Home from "./pages/Home"
import Header from "./components/Header"
import ShowData from "./pages/ShowData"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/show-data" element={<ShowData />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App