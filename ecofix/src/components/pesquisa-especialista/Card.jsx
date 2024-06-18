import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import db from './ddconnection';

export default function SearchExperts() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    nome: '',
    localizacao: '',
    especialidade: '',
    disponibilidade: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'usuarios'), where('role', '==', 'specialist'));
        const querySnapshot = await getDocs(q);

        const users = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            nome: data.name || '',
            localizacao: data.location || '',
            especialidade: data.expertise || '',
            disponibilidade: data.availability || '',
            // adicione outros campos necessários aqui
          };
        });

        const filtered = applyFilters(users, searchCriteria);
        setFilteredUsers(filtered);

        // Exibe os critérios de busca e os dados filtrados no console
        console.log("Critérios de Busca:", searchCriteria);
        console.log("Usuários Filtrados:", filtered);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, [searchCriteria]);

  const applyFilters = (users, criteria) => {
    const { nome, localizacao, especialidade, disponibilidade } = criteria;
    return users.filter(user =>
      user.nome.toLowerCase().includes(nome.toLowerCase()) &&
      user.localizacao.toLowerCase().includes(localizacao.toLowerCase()) &&
      user.especialidade.toLowerCase().includes(especialidade.toLowerCase()) &&
      user.disponibilidade.toLowerCase().includes(disponibilidade.toLowerCase())
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <h1>Buscar Especialistas</h1>
      <form className='formulario-div'>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={searchCriteria.nome}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Localização:</label>
          <input
            type="text"
            name="localizacao"
            placeholder="Localização"
            value={searchCriteria.localizacao}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Especialidade:</label>
          <input
            type="text"
            name="especialidade"
            placeholder="Especialidade"
            value={searchCriteria.especialidade}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Disponibilidade:</label>
          <input
            type="text"
            name="disponibilidade"
            placeholder="Disponibilidade"
            value={searchCriteria.disponibilidade}
            onChange={handleChange}
          />
        </div>
      </form>
      
      <ul className='resultado-search-list'>
        {filteredUsers.map(user => (
          <li key={user.id} className="profile-card">
            <div className="profile-info">
              <h2>{user.nome}</h2>
              <p><strong>Localização:</strong> {user.localizacao}</p>
              <p><strong>Especialidade:</strong> {user.especialidade}</p>
              <p><strong>Disponibilidade:</strong> {user.disponibilidade}</p>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
  
  
}
