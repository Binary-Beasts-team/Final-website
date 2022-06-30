import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/user/signup" element={<Signup />} />
          <Route exact path="/user/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
