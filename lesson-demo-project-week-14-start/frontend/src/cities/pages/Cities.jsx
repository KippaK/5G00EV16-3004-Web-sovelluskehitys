import { useQuery } from '@tanstack/react-query'

import CitiesList from '../components/CitiesList';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';

import { getCities } from "../api/cities";

const Cities = () => {

  const { data, isLoading, error } = useQuery(
    { 
      queryKey: ["citiesData"], 
      queryFn: () => getCities()
    }
  );

  if (isLoading) { 
    return (
      <div className="center">
        <LoadingSpinner />;
      </div>
    )
  }

  if (error) return <h1>`An error has occurred: ${error.message}`</h1>;

  return (
    <CitiesList items={data} />
  )

};

export default Cities;