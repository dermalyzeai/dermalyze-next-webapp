import * as Icon from 'react-bootstrap-icons';

function Footer() {
  
  
  return(
    <>
    <div className="p-3"></div>
  <footer className="bg-dark text-center text-white rounded-3">

  <div className="container p-4 pb-0">

    <section className="mb-4">

      <a className="btn btn-outline-light btn-floating m-1" href="https://boulderbugle.com/my-google-profile-Qr6XopIM" role="button"
        ><Icon.Google />
      </a>


      <a className="btn btn-outline-light btn-floating m-1" href="https://instagram.com/dermalyze" role="button"
        ><Icon.Instagram />
       </a>


      <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/dermalyzeai" role="button"
        ><Icon.Github />
      </a>
    </section>

  </div>



  <div className="text-center p-3 bg-dark" >
    © &nbsp; {new Date().getFullYear()} Copyright:&nbsp;
    <a className="text-white" href="#">Dermalyze</a>
  </div>

</footer>

</>
  );
  
} export default Footer;