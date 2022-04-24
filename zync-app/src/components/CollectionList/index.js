import React, { useState, useEffect } from "react";
import { Collection, CollectionItem } from 'react-materialize'
import FilterInput from "../FilterInput";
import "./style.css"

export default function CollectionList(props) {
    const [userInfo, setUserInfo] = useState([])
    const [nameFilter, setNameFilter] = useState('')

    useEffect(() => {
        console.log(props.userData)
        if(nameFilter === '') {
            findAverages(props.userData)
        }
        else {
            filterResults(props.userData)
        }
    }, [props.userData, nameFilter])

    function findAverages(userData) {
        let tempUser = []
        for (let i = 0; i < userData.length; i++) {
            tempUser.push(userData[i])
            let tempAverage = 0
            for (let j = 0; j < userData[i].grades.length; j++) {
                tempAverage = tempAverage + parseInt(userData[i].grades[j])
            }
            tempAverage = tempAverage / userData[i].grades.length
            tempUser[i].average = tempAverage
        }
        setUserInfo(tempUser)
    }

    function handleSetNameFilter(x) {
        setNameFilter(x)
    }

    function filterResults(userData) {
        const filteredUsers = userData.filter(user => {
            return (user.firstName.toLowerCase().includes(nameFilter.toLowerCase()) || user.lastName.toLowerCase().includes(nameFilter.toLowerCase())) || ((user.firstName.toLowerCase() + " " + user.lastName.toLowerCase()).includes(nameFilter.toLowerCase()))
        })
        findAverages(filteredUsers)
    }

    return (
        <div>
            <Collection>
                <FilterInput nameFilter={nameFilter} setNameFilter={(x) => handleSetNameFilter(x)}/>
                {userInfo.length > 0 ? userInfo.map(user => (
                    <CollectionItem className="avatar" key={user.id}>
                        <img className="userImage left" src={user.pic} />
                        <span className="title userName">{user.firstName} {user.lastName}</span>
                        <div className="indent">
                            <p>Email: {user.email}</p>
                            <p>Company: {user.company}</p>
                            <p>Skill: {user.skill}</p>
                            <p>Average: {user.average}%</p>
                        </div>
                    </CollectionItem>
                )): null}
                
            </Collection>
        </div>
    )
}
