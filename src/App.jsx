import './App.css'
import router from './routes'
//import { StyledEngineProvider } from '@mui/material/styles'

import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'

function App() {
  return (
        <AuthProvider>
              <RouterProvider router={router} />
        </AuthProvider>
  )
}

export default App;