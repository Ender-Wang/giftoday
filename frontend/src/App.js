import {Routes, Route} from 'react-router-dom';
import {React} from 'react';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage'

function App() {
  return(
    <div>
      <Routes>

        <Route path="/" element={<HomePage/>}>
        <Route path="/loginpage" element= {<LoginPage/>}/>
        <Route path="/registrationpage" element= {<RegistrationPage/>}/>

        </Route>
      </Routes>
    </div>

  );
}
  
export default App;