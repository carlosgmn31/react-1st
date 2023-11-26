import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carro = ({ match }) => {
  const [carro, setCarro] = useState({});

  useEffect(() => {
    const carId = match.params.id;
    axios.get(`http://localhost:3001/carros/${carId}`)
      .then(response => setCarro(response.data))
      .catch(error => console.error(error));
  }, [match.params.id]);

  return (
    <div>
      <h2>Detalhes do Carro</h2>
      <p>Marca: {carro.marca}</p>
      <p>Modelo: {carro.modelo}</p>
    </div>
  );
};

export default Carro;
