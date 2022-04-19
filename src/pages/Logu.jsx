import React from 'react'
import { LogoutButton } from '../components/auth0/Logout'

const Logu = () => {
  return (
    <div>
        <header/>
        <main>
            <div className='contenedor sombra login-home'>
                <h1>Are you sure you want to logout?</h1>
                    <LogoutButton />
            </div>              
        </main> 
    </div>
  )
}

export default Logu