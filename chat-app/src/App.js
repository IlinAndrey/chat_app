import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/chat/Chat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Login />} />
        <Route path='registration' element={<Register />} />
        <Route path='chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
