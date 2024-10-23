import Navbar from './Navbar';
import Footer from './Footer';
import ParticlesBackground from '../components/AnimatedBackground';

const Layout = ({ children }) => {
  return (
    <>
    <ParticlesBackground />
    <div className="background-color" style={{ padding: '.25rem' }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
    </>
  );
};

export default Layout;
