import React from "react";

const Filter = ({filterValue, handlefilterChange}) => {
    return (
    <>filter shown with <input type="text" value={filterValue} onChange={handlefilterChange}/></>
    )
};

export default Filter;