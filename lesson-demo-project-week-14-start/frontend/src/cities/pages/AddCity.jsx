import {useRef} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

import Input from "../../shared/input/Input";
import Button from "../../shared/button/Button";
import { useAuthContext } from "../../shared/context/auth-context";

import { createCity } from "../api/cities";

import './AddCity.css';

const AddCity = () => {
  const { token } = useAuthContext();
  const history = useHistory();

  const queryClient = useQueryClient();

  const capitalRef = useRef();
  const countryRef = useRef();
  const imageRef = useRef();

  const createCityMutation = useMutation({
    mutationFn: createCity,
    onSuccess: () => {
      queryClient.invalidateQueries("citiesData");
      history.push("/")
    },
    onError: (error) => {
      console.error(error)
    }
  });

  const citySubmitHandler = async event => {
    event.preventDefault();
    createCityMutation.mutate({
      capital: capitalRef.current.value,
      country: countryRef.current.value,
      image: imageRef.current.value,
      token: token
    })
  };


  return (
    <form className="city-form" onSubmit={citySubmitHandler}>
      <Input id="capital" ref={capitalRef} type="text" label="Capital" />
      <Input id="country" ref={countryRef} type="text" label="Country" />
      <Input id="image" ref={imageRef} type="text" label="Image filename" />
      <Button id="add-city" type="submit">
        Add City
      </Button>
    </form>
  )
};

export default AddCity;