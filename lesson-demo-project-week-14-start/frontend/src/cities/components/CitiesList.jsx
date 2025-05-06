import PropTypes from 'prop-types';

import CityItem from './CityItem';
import './CitiesList.css';

const CitiesList = ({ items }) => {
  return <ul className="cities-list">
    {items.map(city => 
      <CityItem 
        key={city.id}
        cityId={city.id}
        capital={city.capital}
        country={city.country}
        image={city.image}
      />
    )}
    </ul>
};

CitiesList.propTypes = {
  items: PropTypes.array,
};

export default CitiesList;