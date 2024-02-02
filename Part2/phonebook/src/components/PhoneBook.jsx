/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const PhoneBook = ({ filteredPersons, handleDelete }) => {
    return (
        <div>
            <h2>Numbers</h2>
            <div>
                {filteredPersons.map(p => (
                <p key={p.name}>{p.name} {p.number}<button onClick={() => handleDelete(p.id)}>delete</button></p>
                ))}
            </div>
        </div>
    )
}

export default PhoneBook;