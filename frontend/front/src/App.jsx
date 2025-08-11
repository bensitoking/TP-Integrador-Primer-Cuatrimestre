import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Navbar from "./components/Shared/Navbar";
import Home from "./components/Shared/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import EventsList from "./components/Events/EventsList";
import EventDetail from "./components/Events/EventDetail";
import MyEvents from "./components/Events/MyEvents";
import CreateEventForm from "./components/Events/CreateEventForm";
import LocationsList from "./components/Locations/LocationsList";
import PrivateRoute from "./components/Shared/PrivateRoute";
import "./App.css"; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="site-max py-8 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<EventsList />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route element={<PrivateRoute />}>
                <Route path="/my-events" element={<MyEvents />} />
                <Route path="/create-event" element={<CreateEventForm />} />
                <Route path="/locations" element={<LocationsList />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
