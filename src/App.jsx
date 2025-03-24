import './App.css'
import router from './routes'
import ThemeCustomization from './themes';

//import { StyledEngineProvider } from '@mui/material/styles'

import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'

function App() {
  return (
        <AuthProvider>
            <ThemeCustomization>
              <RouterProvider router={router} />
            </ThemeCustomization>
        </AuthProvider>
  )
}

export default App;