
import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring" data-testid="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;