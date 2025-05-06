import PropTypes from 'prop-types';

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from 'react-router-dom';

import { useAuthContext } from "../../shared/context/auth-context";

import Modal from '../../shared/modal/Modal';
import Card from '../../shared/card/Card';
import Button from '../../shared/button/Button';

import { deleteCity } from "../api/cities";

import './CityItem.css';

const CityItem = props => {
  const history = useHistory();
  const { isLoggedIn, token } = useAuthContext();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const queryClient = useQueryClient();

  const deleteCityMutation = useMutation({
    mutationFn: deleteCity, 
    onSuccess: (data) => {
      queryClient.invalidateQueries("citiesData");
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    deleteCityMutation.mutate({
      cityId: props.cityId,
      token: token
    })
  }

  const handleEdit = () => {
    history.push(`/cities/edit/${props.cityId}`);
  };

  return (
    <>
      <li className="city-item">
        <Card className="city-item__content">
          <div className="city-item__image">
            <img src={`${import.meta.env.VITE_API_URL}/images/${props.image}`} alt={props.capital} />
          </div>
          <div className="city-item__info">
            <h3>{props.capital} - {props.country}</h3>
          </div>
          { isLoggedIn && (
            <div className="city-item__actions">
              <Button onClick={handleEdit}>Edit</Button>
              <Button danger onClick={showConfirmationHandler}>Delete</Button>
            </div>
          )}
        </Card>
      </li>

      <Modal  
        show={showConfirmationModal}
        header="Are you sure?" 
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelConfirmationHandler}>Cancel</Button>
            <Button delete onClick={deleteConfirmedHandler}>Delete</Button>
          </>
        }
      >
        <p>Are you sure? Once it's gone, it's gone!</p>
      </Modal>  
    </>
  )
};

CityItem.propTypes = {
  cityId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  capital: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default CityItem;