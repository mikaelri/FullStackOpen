import React from "react";

const FilterResults = ({showFiltered}) => {
    return (
        <div>
            {showFiltered.map((person, id) => (
            <p key={id}>
                {person.name} {person.number}
            </p>))}
        </div>
    )
};

export default FilterResults;