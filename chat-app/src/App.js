import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='registration' element={<Register />} />
      </Routes>
    </BrowserRouter>
    // <Chat />
  );
}

export default App;
