import React from 'react'
import { TextInput } from 'react-materialize'
import './style.css'

export default function TagInput(props) {

    function handleTagSubmit(event) {
        if (event.key === 'Enter') {
            props.handleNewTag(event.target.value, props.id)
            event.target.value = ''
        }
    }

    return (
        <TextInput
            id={'tag-input' + props.id}
            placeholder="Add a tag"
            className='tag-input'
            onKeyPress={handleTagSubmit}

        >

        </TextInput>
    )
}
