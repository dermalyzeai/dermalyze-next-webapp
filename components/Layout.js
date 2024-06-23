import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div style={{ padding: '5px' }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
