import styles from './BigBlock.module.css';

function BigBlock(){
    return (<>
    <div className="jumbotron jumbotron-fluid text-center titleImage">
    <div className="titleBox">
      <h1 className="display-4">Welcome to Dermalyze</h1>
      <p className="lead">A fast and convenient AI model to detect skin conditions.</p>
      <hr className="my-4" />
  <p>A machine learning project aimed at helping individuals easily find solutions to common skin issues.</p>
  <a className={"btn btn-primary btn-lg " + styles.greenDermalyze} href="#appMiddle" role="button">Try Now!</a>
    </div>
  </div></>)
}
export default BigBlock;