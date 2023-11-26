import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CarroList from './components/CarroList';
import CarroForm from './components/CarroForm';
import Carro from './components/Carro';
import './styles.css';
import CarroEdit from './components/CarroEdit';

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>Gestão de Frostas</h1>
        </header>
        

        <nav>
          <NavLink to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/adicionar" activeClassName="active">Adicionar Carro</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<CarroList />} />
          <Route path="/adicionar" element={<CarroForm />} />
          <Route path="/carro/:id" element={<Carro />} />
          <Route path="/carros/edit/:id" element={<CarroEdit  />} />
        </Routes>
        
      </div>
      
    </Router>
    
  );
};

export default App;
