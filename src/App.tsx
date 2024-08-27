import { WagmiProvider } from 'wagmi'
import './App.css'
import AllRoutes from './components/allRoutes'
import { wagmiConfig } from './setting/wagmi/configWagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <NextUIProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AllRoutes />
          </QueryClientProvider>
        </WagmiProvider>
      </NextUIProvider>
      <ToastContainer />
    </>
  )
}

export default App
