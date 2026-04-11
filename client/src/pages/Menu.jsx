import Navbar from '../components/Navbar'
import MenuSection from '../components/MenuSection'

function Menu() {
  return (
    <div style={{ backgroundColor: '#000A48', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <MenuSection />
      </div>
    </div>
  )
}

export default Menu