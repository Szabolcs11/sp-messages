import React, { useState, useEffect } from 'react'
import Style from './../style/AuthStyle.css'
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";

function Auth() {
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();

    const [RegUsername, setRegUsername] = useState();
    const [RegPassword, setRegPassword] = useState();
    const [RegEmail, setRegEmail] = useState();

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const straiurl = "http://localhost:1337/api/"


    const Login = () => {
        axios.post('http://localhost:1337/api/auth/local', {
            identifier: Username,
            password: Password,
        }).then(res=> {
            console.log(res.data);
            setCookie("token", res.data.jwt);
            window.location.reload(false);
        })
    }

    const Register = () => {
        // axios.post('http://localhost:1337/api/accounts', {
        //     "data": {
        //         "Username": RegUsername,
        //         "Password": RegPassword,
        //         "Email": RegEmail
        //     },
        // }).then(res=> {
        //     console.log(res.data)
        // })

        axios.post('http://localhost:1337/api/auth/local/register', {
            username: RegUsername,
            email: RegEmail,
            password: RegPassword,
        }).then(res=> {
            console.log(res.data)
        })
    }

    return (
        <div className='Auth-Bg'>
            <div className='Auth-Container'>
                <div className='Auth-Title'>
                    Login
                </div>
                <div className='Auth-Inputs'>
                    <input type="text" onChange={e=> {
                        setUsername(e.target.value)
                    }}/>
                    <input type="password" onChange={e=> {
                        setPassword(e.target.value)
                    }}/>
                </div>
                <div className='Auth-Button-Container'>
                    <div className='Auth-Button' onClick={Login}>
                        Login
                    </div>
                </div>
            </div>

            <div className='Auth-Container'>
                <div className='Auth-Title'>
                    Register
                </div>
                <div className='Auth-Inputs'>
                    <input type="text" onChange={e=> {
                        setRegUsername(e.target.value)
                    }}/>
                    <input type="text" onChange={e=> {
                        setRegEmail(e.target.value)
                    }}/>
                    <input type="password" onChange={e=> {
                        setRegPassword(e.target.value)
                    }}/>
                </div>
                <div className='Auth-Button-Container'>
                    <div className='Auth-Button' onClick={Register}>
                        Register
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth