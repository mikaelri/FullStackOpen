import React from "react";

const FilterResults = ({showFiltered, handlePersonDelete}) => {
    return (
        <div>
            {showFiltered.map((person, id) => (
            <p key={id}>
                {person.name} {person.number}
                <button onClick={() => handlePersonDelete(person)}>Delete</button>
            </p>))}
        </div>
    )
};

export default FilterResults;