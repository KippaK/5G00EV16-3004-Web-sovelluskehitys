import {useRef, useEffect} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/input/Input";
import Button from "../../shared/button/Button";
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import { useAuthContext } from "../../shared/context/auth-context";

import { updateCity, getCityById } from "../api/cities";

import './AddCity.css';

const EditCity = () => {
  const { token } = useAuthContext();

  const history = useHistory();
  const queryClient = useQueryClient();

  const capitalRef = useRef();
  const countryRef = useRef();
  const imageRef = useRef();

  const { id: cityId } = useParams();

  const { data, isLoading, isError } = useQuery(
    { 
      queryKey: ["cityData", cityId], 
      queryFn: () => getCityById( { cityId })
    }
  );

  useEffect(() => {
    if (data) {
      capitalRef.current.value = data.capital || "";
      countryRef.current.value = data.country || "";
      imageRef.current.value = data.image || "";
    }
  }, [data]);

  const updateCityMutation = useMutation({
    mutationFn: updateCity,
    onSuccess: () => {
      queryClient.invalidateQueries("citiesData");
      queryClient.invalidateQueries(["city", cityId]);
      history.push("/")
    },
    onError: (error) => {
      console.error(error)
    }
  });

  if (isLoading) { 
    return (
      <div className="center">
        <LoadingSpinner />;
      </div>
    )
  }

  if (isError) { 
    return (
      <div className="center">
        <h2>Failed to load the city for editing</h2>;
      </div>
    )
  }

  const citySubmitHandler = async event => {
    event.preventDefault();
    updateCityMutation.mutate({
      cityId: parseInt(cityId),
      capital: capitalRef.current.value,
      country: countryRef.current.value,
      image: imageRef.current.value,
      token: token
    })
  };


  return (
      <form className="city-form" onSubmit={citySubmitHandler}>
        <div className="city-item__image">
          <img src={`${import.meta.env.VITE_API_URL}/images/${data.image}`} alt={data.capital} />
        </div>
        <Input id="capital" ref={capitalRef} type="text" label="Capital" />
        <Input id="country" ref={countryRef} type="text" label="Country" />
        <Input id="image" ref={imageRef} type="text" label="Image filename" />
        <Button type="submit">
          UPDATE CITY
        </Button>
      </form>
  )
};

export default EditCity;