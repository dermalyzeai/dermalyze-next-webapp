const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Dermalyze AI. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  textAlign: 'center',
  padding: '20px',
  position: 'relative',
  left: '0',
  bottom: '0',
  width: '100%',
  backgroundColor: '#333',
  color: 'white',
  borderRadius: '15px',
};

export default Footer;
