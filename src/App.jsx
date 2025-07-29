import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Login from "./pages/Login"
import AddMovie from "./pages/AddMovie"
import Home from "./pages/Home"
import Header from "./components/Header"
import ShowData from "./pages/ShowData"
import { createContext, useState } from "react"
import Description from "./pages/Description"
export const AppContext = createContext();
const App = () => {
  const [movies, setMovies] = useState([])
  return (
    <>
      <AppContext.Provider value={{ movies, setMovies }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/show-data" element={<ShowData />} />
            <Route path="/desc" element={<Description/>} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  )
}

export default App