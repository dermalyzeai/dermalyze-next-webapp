import Navbar from './Navbar';
import Footer from './Footer';
import ParticlesBackground from '../components/AnimatedBackground';

const Layout = ({ children }) => {
  return (
    <>
    <ParticlesBackground />
    <div style={{ padding: '5px' }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
    </>
  );
};

export default Layout;
