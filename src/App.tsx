import { WagmiProvider } from 'wagmi'
import './App.css'
import AllRoutes from './components/allRoutes'
import { wagmiConfig } from './setting/wagmi/configWagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <NextUIProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AllRoutes />
            <Toaster
              position='top-left'
              toastOptions={{
                duration: 4000 // Thời gian hiển thị là 3 giây (3000ms)
              }}
            />
          </QueryClientProvider>
        </WagmiProvider>
      </NextUIProvider>
    </>
  )
}

export default App
