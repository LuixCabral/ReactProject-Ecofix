import React, { useState } from 'react';
import Users from './Users';

/**
 * SearchExperts componente
 */
export default function SearchExperts() {
  /**
   * State variables para armazenar user's input
   */
  const [query, setQuery] = useState(""); // Search query
  const [location, setLocation] = useState(""); // Location filter
  const [expertise, setExpertise] = useState(""); // Area of expertise filter
  const [availability, setAvailability] = useState(""); // Disponibilidade filtro

  /**
   * Filtrar os usuarios baseados nos criterios
   */
  const filteredUsers = Users.filter((user) => {
    // Converta a pesquisa para lowercase
    const queryLowercase = query.toLowerCase();

    // se o nome ou email é igual 
    const nameMatch = user.name.toLowerCase().includes(queryLowercase) || user.email.toLowerCase().includes(queryLowercase);

    // Se o endereco é igual a localizacao
    const locationMatch = user.address.toLowerCase().includes(location.toLowerCase());

    // Se a especialidade
    const expertiseMatch = user.expertise.some((expertiseItem) => expertiseItem.toLowerCase().includes(expertise.toLowerCase()));

    // Disponibilidade
    const availabilityMatch = user.availability.includes(availability);

    // Retorna se todos os filtros estao certos
    return nameMatch && locationMatch && expertiseMatch && availabilityMatch;
  });

  /**
   * Resultado e pesquisa
   */
  return (
    <div className="conteudoDiv">
      <div className='formularioDiv' >
        <h2> Ache Especialistas </h2>
        <form>
          <label>
            Procure:
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Procurar por nome ou email"
            />
          </label>
          <br />
          <label>
            Localização:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Prcurar por local"
            />
          </label>
          <br />
          <label>
            Especialidade:
            <select value={expertise} onChange={(e) => setExpertise(e.target.value)}>
              <option value="">Selecione a area de especialidade</option>
              <option value="Energia renovavel">Energia renovavel</option>
              <option value="Agricultura sustentavel">Agricultura sustentavel</option>
              <option value="mudanca climatica">mudanca climatica</option>
              {/* Adicionar mais se precisar*/}
            </select>
          </label>
          <br />
          <label>
            Disponibilidade:
            <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <option value="">Selecione Disponibilidade</option>
              <option value="Disponivel Agora">Disponivel Agora</option>
              <option value="Disponivel em 1-2 semanas">Disponivel em 1-2 semanas</option>
              <option value="Disponivel em 2-4 semanas">Disponivel em 2-4 semanas</option>
              {/* Adicionar mais se precisar */}
            </select>
          </label>
        </form>
      </div>
      <div id='listaNomeDiv'>
        <ul className="lista">
            {filteredUsers.map((user) => (
              <li key={user.id} className="itemLista">
                {user.name} ({user.address}) - {user.email}
                <br />
                Especialidade: {user.expertise.join(", ")}
                <br />
                Disponibilidade: {user.availability}
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}