import './loader.css';

function Loader(): JSX.Element {
  return (
    <div className="loader" data-testid="loader">
      <span className="loader__spinner"></span>
    </div>
  );
}

export default Loader;
