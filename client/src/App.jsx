import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Order from './pages/Order'
import IntroScreen from './components/IntroScreen'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <AuthProvider>
      {!introComplete && <IntroScreen onFinish={() => setIntroComplete(true)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  )
}

export default App