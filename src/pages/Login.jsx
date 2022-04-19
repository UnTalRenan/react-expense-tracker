import React from 'react'
import { LoginButton } from '../components/auth0/Login'

const Login = () => {
  return (
    <div>
         <header/>
          <main>
            <div className='contenedor sombra login-home'>
                <h1>Registration or Authentication is required</h1>
                  <LoginButton/>
            </div>              
            </main> 
    </div>
  )
}

export default Login