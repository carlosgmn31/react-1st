import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarroEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [renavam, setRenavam] = useState('');
    const [chassi, setChassi] = useState('');
    const [placa, setPlaca] = useState('');
  
    useEffect(() => {
      const carregarDadosDoCarro = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/carros/${id}`);
          const carro = response.data;
  
          setMarca(carro.marca);
          setModelo(carro.modelo);
          setAno(carro.ano);
          setRenavam(carro.renavam);
          setChassi(carro.chassi);
          setPlaca(carro.placa);
        } catch (error) {
          console.error(error);
        }
      };
  
      carregarDadosDoCarro();
    }, [id]);
  
    const handleEditarCarro = async (e) => {
      e.preventDefault();
  
      // Verifica se os campos obrigatórios estão preenchidos
      if (!marca || !modelo || !ano || !renavam || !chassi || !placa) {
        toast.error('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
  
      const carroAtualizado = { marca, modelo, ano, renavam, chassi, placa };
  
      try {
        await axios.put(`http://localhost:3001/carros/${id}`, carroAtualizado);
        toast.success('Informações atualizadas com sucesso!');
        setTimeout(() => {
            navigate('/');
          }, 3000);
      } catch (error) {
        console.error(error);
        alert('Erro ao editar o carro. Por favor, tente novamente.');
      }
    };
  
    return (
      <div>
          <h2 style={{ textAlign: 'center' }}>Editar Carro</h2>
        <form onSubmit={handleEditarCarro}>
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
          <button type="submit">Salvar Alterações</button>
        </form>
        <ToastContainer />
      </div>
    );
  };
  
  export default CarroEdit;