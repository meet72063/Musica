import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  {BrowserRouter} from 'react-router-dom'
import {store ,persistor}from './store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ScrollToTop from './Pages/ScrollToTop.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store} >
  <PersistGate loading={null} persistor={persistor}>
   <BrowserRouter>
   <ScrollToTop/>
    <App />
  </BrowserRouter>
  </PersistGate>
 
</Provider>)