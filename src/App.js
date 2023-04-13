import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from '../../frontend/src/pages/Home/Home';
// import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Login from './pages/auth/Login';
import Polls from './pages/Poll/Polls';
import PollsDetails from './pages/Poll/PollsDetails';
import AddPoll from './pages/Poll/AddPoll';

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/polls/:id" element={<PollsDetails />} />
        <Route path="/addPoll" element={<AddPoll />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
