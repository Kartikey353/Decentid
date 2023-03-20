import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { Navbarhead } from './Components/Navbar/Navbarhead';
import { useState, useEffect } from 'react';
import Home from './Components/Pages/Home';
import { Profile } from './Components/Pages/Profile';
import { Dashboard } from './Components/Pages/Dashboard';
import Upload from './Components/Pages/Upload';
function App() {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 8000);
  }, [])

  return (
    <>
      {
        loading ?
          <div className="App space-y-6 flex flex-col">
            <HashLoader
              color={"#123abc"}
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div className="text-2xl font-bold text-white">
              Loading...
            </div>
          </div>
          :
          <Router>
            <Navbarhead className="w-[100vw]" />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile/:id" element={<Profile />}></Route>
              <Route path="/dashboard/:id" element={<Dashboard />}></Route>
              <Route path="/upload" element={<Upload />}></Route>
            </Routes>
          </Router>
      }
    </>
    // <Router>
    //   <Navbarhead className="w-[100vw]" />
    //   <Routes>
    //     <Route path="/" element={<Home />}></Route>
    //     <Route path="/profile/:id" element={<Profile />}></Route>
    //     <Route path="/dashboard/:id" element={<Dashboard />}></Route>
    //     <Route path="/upload" element={<Upload />}></Route>
    //   </Routes>
    // </Router>
  );
}

export default App;
