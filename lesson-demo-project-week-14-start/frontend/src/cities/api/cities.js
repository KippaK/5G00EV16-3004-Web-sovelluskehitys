export const getCities = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/cities`
  );

  if (!res.ok) throw new Error("Failed to fetch city data");

  return await res.json();
};

export const getCityById = async ({cityId}) => {

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/cities/${cityId}`
  );

  if (!res.ok) throw new Error("Failed to fetch city data");

  return await res.json();
};

export const createCity = async ({capital, country, image, token}) => {
  console.log(token)
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/cities`, 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        capital,
        country,
        image
      })
    }
  );

  if (!res.ok) throw new Error("Failed to add city");

  return await res.json();
}

export const updateCity = async ({cityId, capital, country, image, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/cities`, 
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        id: cityId,
        capital,
        country,
        image
      })
    }
  );

  if (!res.ok) throw new Error("Failed to update city");

  return await res.json();
}

export const deleteCity = async ({cityId, token}) => {

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/cities/${cityId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  );

  if (!res.ok) throw new Error("Failed to delete city");
  
  return await res.json();
};