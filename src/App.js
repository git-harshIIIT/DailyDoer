import './App.css';
import Homepage from './components/Homepage';
import Welcome from './components/Welcome';
import {BrowserRouter, Route,Routes} from "react-router-dom"
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Welcome/>}/>
          <Route path = "/homepage" element = {<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
