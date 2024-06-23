
function LoadingSpinner(){
    return <div className="d-flex justify-content-center"><div className="spinner-border  m-3" role="status"id = "spinner" style =  {{display:'none'}}>
    <span className="visually-hidden"  id = "spinner" >Loading...</span>
  </div></div>;
}
export default LoadingSpinner;