import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';

const Login = () => {

    useEffect(() => {
        axios.get('http://localhost:8080/admin/get-access-token')
        .then(result => {
            console.log(result.data);
            localStorage.setItem('accessToken', result.data.token[0].accessToken);
            localStorage.setItem('refreshToken', result.data.token[0].refreshToken);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const login = (e) => {
        e.preventDefault();

        axios.get('http://localhost:8080/admin/login')
        .then(result => {
            //console.log(result.data);
            window.location.replace(result.data.url);
        })
        .catch(error => {
            console.log(error);
        })
    }

  return (
    <div>
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login