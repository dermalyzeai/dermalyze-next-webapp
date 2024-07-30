import Navbar from './Navbar';
import Footer from './Footer';
import ParticlesBackground from '../components/AnimatedBackground';

const Layout = ({ children }) => {
  return (
    <>
    <ParticlesBackground />
    <div style={{ padding: '.25rem' }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
    </>
  );
};

export default Layout;
