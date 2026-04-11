import Navbar from '../components/Navbar'
import GallerySection from '../components/GallerySection'
import Footer from '../components/Footer'

function Gallery() {
  return (
    <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <GallerySection />
        <Footer />
      </div>
    </div>
  )
}

export default Gallery