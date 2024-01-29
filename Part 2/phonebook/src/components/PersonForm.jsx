/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const PersonForm = ({ handleSubmit, handlePersonChange, newPerson }) => {
    return (
      <div>
        <h3>Add a new</h3>
        <form onSubmit={handleSubmit}>
            <div>
              <div>name: <input name="name" value={newPerson.name} onChange={handlePersonChange}/></div>
              <div>number: <input name="number" value={newPerson.number} onChange={handlePersonChange} /></div>
            </div>
            <div>
              <button type="submit">add</button>
            </div>
        </form>
      </div>
    )
}

export default PersonForm;