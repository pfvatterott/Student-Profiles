import React from "react";
import { TextInput } from 'react-materialize'
import "./style.css"

export default function TagFilterInput(props) {

    function handleFilterChange(event) {
        const filterValue = event.target.value
        props.setTagFilter(filterValue)
    }

    return (
        <TextInput
            id="tagFilter"
            placeholder="Search by tag"
            onChange={handleFilterChange}
        />
    )
}
