import React from "react";
import { TextInput } from 'react-materialize'
import "./style.css"

export default function FilterInput(props) {

    function handleFilterChange(event) {
        const filterValue = event.target.value
        props.setNameFilter(filterValue)
    }

    return (
        <TextInput
            id="nameFilter"
            placeholder="Search by name"
            onChange={handleFilterChange}
        />
    )
}
