import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import {Auth0Provider} from '@auth0/auth0-react'
ReactDOM.render(
  
  <React.StrictMode>
    
    <Auth0Provider domain='dev-vxx3w2jq.us.auth0.com' clientId='44VOxyfJNjVADBnV1QLIABVQaUhjAJyV' redirectUri={window.location.origin}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

