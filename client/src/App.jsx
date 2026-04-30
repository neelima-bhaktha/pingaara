import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import Admin from './pages/Admin'
import IntroScreen from './components/IntroScreen'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {!introComplete && <IntroScreen onFinish={() => setIntroComplete(true)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App