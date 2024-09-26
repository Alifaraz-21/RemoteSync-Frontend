import { Suspense } from 'react'
import { ReactDOM } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StyleSheetManager } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
      <StyleSheetManager shouldForwardProp={(prop)=>prop !=="shake"}>
      <App />
      </StyleSheetManager>
      </BrowserRouter>

    </Suspense>
    
  
)
