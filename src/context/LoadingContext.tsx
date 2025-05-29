import { createContext, useContext, useState, useEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

interface LoadingContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
})

export const useLoading = () => useContext(LoadingContext)

interface LoadingProviderProps {
  children: React.ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const navigationType = useNavigationType()

  const startLoading = () => {
    setIsLoading(true)
  }

  const stopLoading = () => {
    setIsLoading(false)
  }

  // Detect route changes
  useEffect(() => {
    // Start loading on route change
    startLoading()
    
    // Set a fixed loading time (1 second)
    const timer = setTimeout(() => {
      stopLoading()
    }, 1000)
    
    // Clean up timer
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}