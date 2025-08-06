import { createContext, useState } from 'react'

export const EventContext = createContext()

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams, setSearchParams] = useState({})

  return (
    <EventContext.Provider value={{
      events, setEvents,
      currentPage, setCurrentPage,
      totalPages, setTotalPages,
      searchParams, setSearchParams
    }}>
      {children}
    </EventContext.Provider>
  )
}