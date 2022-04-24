import React, { useState, useEffect } from "react";
import { TextInput } from 'react-materialize'
import "./style.css"

export default function FilterInput() {
  return (
    <TextInput
        id="nameFilter"
        placeholder="Search by name"
    />
  )
}
