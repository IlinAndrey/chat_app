import React, { useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  Link,
} from "react-router-dom";

function Login() {
  const csrftoken = Cookies.get('csrftoken')

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const data = { csrftoken, username, password };

      axios.post('/api-auth/login/', data, {
        headers: {
          'X-CSRFToken' : csrftoken,
          'Content-Type': 'application/x-www-form-urlencoded',
          }
      })
        .then(response => {
          console.log('Успешный вход:', response.data);
          window.location.href = '/chat';
        })
        .catch(error => {
          console.error('Ошибка входа:', error);
        });

  }

  return (
    <div>
      <input
        name="csrfmiddlewaretoken"
        type="hidden"
        value={csrftoken}
      />
      <input
        id="username"
        name="username"
        type="username"
        autoComplete="username"
        onChange={e => setUsername(e.target.value)}
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="password"
        onChange={e => setPassword(e.target.value)}
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button onClick={handleLogin}>Войти</button>
      <p className="mt-10 text-center text-sm text-gray-500">
            Нет аккаунта?{' '}
            <Link to="/registration">
                <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Зарегистрируйтесь
                </a>
            </Link>
          </p>
    </div>
  )
}

export default Login