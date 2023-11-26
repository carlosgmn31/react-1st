import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; 
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const CarroList = () => {
  const [carros, setCarros] = useState([]);
  const [serverStatus, setServerStatus] = useState('loading');

  useEffect(() => {
    // Verifica o estado do servidor
    axios.get('http://localhost:3001')
      .then(() => {
        // Se a requisição for bem-sucedida, o servidor está ligado
        setServerStatus('online');
        axios.get('http://localhost:3001/carros')
          .then(response => setCarros(response.data))
          .catch(error => console.error(error));
      })
      .catch(() => {
        // Se a requisição falhar, o servidor está desligado
        setServerStatus('offline');
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/carros/${id}`);
      setCarros(carros.filter(carro => carro.id !== id));
      toast.success('Carro excluído com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao excluir o carro. Por favor, tente novamente.');
    }
  };

  if (serverStatus === 'loading') {
    return <p>Verificando o estado do servidor...</p>;
  }

  if (serverStatus === 'offline') {
    return <p>O servidor está offline. Por favor, ligue o JSON Server.</p>;
  }

  if (carros.length === 0) {
    return <p>Nenhum carro encontrado.</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Lista de Carros</h2>
      <div className="carro-list">
        {carros.map(carro => (
          <div key={carro.id} className="carro-card">
            <h3>{carro.marca} - {carro.modelo}</h3>
            <p>Ano: {carro.ano}</p>
            <p>Renavam: {carro.renavam}</p>
            <p>Chassi: {carro.chassi}</p>
            <p>Placa: {carro.placa}</p>
            <div className="icons-container">
              <Link to={`/carros/edit/${carro.id}`}>
                <FaEdit className="edit-icon" title="Editar" />
              </Link>
              <FaTrashAlt
                className="delete-icon"
                onClick={() => handleDelete(carro.id)}
                title="Excluir"
              />
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CarroList;