import Navbar from '../components/Navbar'
import AboutSection from '../components/AboutSection'

function About() {
  return (
    <div style={{ backgroundColor: '#1D5C26', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '80px' }}>
        <AboutSection />
      </div>
    </div>
  )
}

export default About