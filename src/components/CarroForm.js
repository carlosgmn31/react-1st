import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarroForm = () => {
  const navigate = useNavigate();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [renavam, setRenavam] = useState('');
  const [chassi, setChassi] = useState('');
  const [placa, setPlaca] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os campos obrigatórios estão preenchidos
    if (!marca || !modelo || !ano || !renavam || !chassi || !placa) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/carros', { marca, modelo, ano, renavam, chassi, placa });
      toast.success('Carro adicionado com sucesso!');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error('Erro ao adicionar o carro. Por favor, tente novamente.');
    }
  };

  return (
    <div>
        <h2 style={{ textAlign: 'center' }}>Adicionar Carro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Marca:
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
        </label>
        <label>
          Modelo:
          <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
        </label>
        <label>
          Ano:
          <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} />
        </label>
        <label>
          Renavam:
          <input type="text" value={renavam} onChange={(e) => setRenavam(e.target.value)} />
        </label>
        <label>
          Chassi:
          <input type="text" value={chassi} onChange={(e) => setChassi(e.target.value)} />
        </label>
        <label>
          Placa:
          <input type="text" value={placa} onChange={(e) => setPlaca(e.target.value)} />
        </label>
        <button type="submit">Adicionar Carro</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CarroForm;
