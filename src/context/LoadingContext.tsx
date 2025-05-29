import  { createContext, useContext, useState, useEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

interface LoadingContextType {
  loading: boolean
  setLoading: (isLoading: boolean) => void
  startLoading: () => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
  startLoading: () => {},
  stopLoading: () => {},
})

export const useLoading = () => useContext(LoadingContext)

interface LoadingProviderProps {
  children: React.ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [loadingTimer, setLoadingTimer] = useState<NodeJS.Timeout | null>(null)
  const location = useLocation()
  const navigationType = useNavigationType()

  const startLoading = () => {
    // Clear any existing timer
    if (loadingTimer) clearTimeout(loadingTimer)
    setLoading(true)
  }

  const stopLoading = () => {
    // Add a small delay before turning off loading for better UX
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    setLoadingTimer(timer)
  }

  // Detect route changes
  useEffect(() => {
    if (navigationType !== "POP") {
      startLoading()
      
      // Set a maximum loading time (3 seconds)
      const maxLoadingTimer = setTimeout(() => {
        stopLoading()
      }, 3000)
      
      return () => clearTimeout(maxLoadingTimer)
    }
  }, [location.pathname])

  return (
    <LoadingContext.Provider value={{ loading, setLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}