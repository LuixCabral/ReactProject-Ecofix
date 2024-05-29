import React, { useState } from 'react';
import { Users } from './Users';  

function Card() {
    const [query, setQuery] = useState("");

    const filteredUsers = Users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="Card">
            <input
                type="text"
                placeholder="pesquise..."
                className="pesquisa"
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="lista">
                {filteredUsers.map(user => (
                    <li key={user.id} className="itemLista">
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Card;
