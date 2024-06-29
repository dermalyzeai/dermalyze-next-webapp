import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Dermalyze AI. All rights reserved.</p>
      <a href="https://www.instagram.com/dermalyze" target="_blank" rel="noopener noreferrer" style={iconStyle}>
        <FaInstagram />
      </a>
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

const iconStyle = {
  color: 'white',
  marginLeft: '10px',
  fontSize: '24px',
};

export default Footer;
