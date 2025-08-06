import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { EventProvider } from './context/EventContext'
import Navbar from './components/Shared/Navbar'
import Alert from './components/Shared/Alert'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import EventsList from './components/Events/EventsList'
import EventDetail from './components/Events/EventDetail'
import MyEvents from './components/Events/MyEvents'
import CreateEventForm from './components/Events/CreateEventForm'
import LocationsList from './components/Locations/LocationsList'
import PrivateRoute from './components/Shared/PrivateRoute'

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <AuthProvider>
      <EventProvider>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {alert && <Alert message={alert.message} type={alert.type} />}
          <Routes>
            <Route path="/" element={<EventsList showAlert={showAlert} />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/register" element={<Register showAlert={showAlert} />} />
            <Route path="/eventos/:id" element={<EventDetail showAlert={showAlert} />} />
            <Route path="/mis-eventos" element={
              <PrivateRoute>
                <MyEvents showAlert={showAlert} />
              </PrivateRoute>
            } />
            <Route path="/crear-evento" element={
              <PrivateRoute>
                <CreateEventForm showAlert={showAlert} />
              </PrivateRoute>
            } />
            <Route path="/ubicaciones" element={
              <PrivateRoute>
                <LocationsList showAlert={showAlert} />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </EventProvider>
    </AuthProvider>
  )
}

export default App