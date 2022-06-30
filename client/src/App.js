import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route exact path="/" element={<Home/>} />

          <Route exact path="/user/signup" element={<Signup />} />
          <Route exact path="/user/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
