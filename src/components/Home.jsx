import PropTypes from 'prop-types';

const ranges = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Home = ({ onRangeSelect }) => {
  return (
    <div>
      <h2>Select the range of numbers:</h2>
      {ranges.map(range => (
        <button key={range} onClick={() => onRangeSelect(range)}>
          Up to {range}
        </button>
      ))}
    </div>
  );
};

Home.propTypes = {
  onRangeSelect: PropTypes.func.isRequired,
};

export default Home;
