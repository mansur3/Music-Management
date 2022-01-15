
import './App.css';
import {MainPage} from "./Components/LandingPage";
import {Album} from "./Components/SingleAlbum";
import {Routes, Route} from "react-router-dom";
import {Profile} from "./Components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path = "/" element = {<MainPage />} />
        <Route path = "/album/:albumSongs" element = {<Album />} />
        <Route path = "/profile" element = {<Profile />}/>
      </Routes>
        
    </div>
  );
}

export default App;
