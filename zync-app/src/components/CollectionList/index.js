import React, { useState, useEffect } from "react";
import { Collection, CollectionItem, Icon } from 'react-materialize'
import FilterInput from "../FilterInput";
import "./style.css"

export default function CollectionList(props) {
    const [userInfo, setUserInfo] = useState([])
    const [nameFilter, setNameFilter] = useState('')
    const [forceUpdate, setForceUpdate] = useState(0)

    useEffect(() => {
        console.log(props.userData)
        let tempUserArray = props.userData
        tempUserArray.forEach(user => {
            if (user.areGradesHidden === null) {
                user.areGradesHidden = true
            }
        });
        if(nameFilter === '') {
            findAverages(tempUserArray)
        }
        else {
            filterResults(tempUserArray)
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

    function handleShowGrades(id) {
        let tempUserInfo = userInfo
        for (let i = 0; i < tempUserInfo.length; i++) {
            if (tempUserInfo[i].id === id && tempUserInfo[i].areGradesHidden === true) {
                tempUserInfo[i].areGradesHidden = false
            }
            else if (tempUserInfo[i].id === id && tempUserInfo[i].areGradesHidden === false) {
                tempUserInfo[i].areGradesHidden = true
            }
        }
        console.log(tempUserInfo)
        setUserInfo(tempUserInfo)
        setForceUpdate(forceUpdate + 1)
    }

    return (
        <div>
            <Collection>
                <FilterInput nameFilter={nameFilter} setNameFilter={(x) => handleSetNameFilter(x)}/>
                {userInfo.length > 0 ? userInfo.map(user => (
                    <CollectionItem className="avatar" key={user.id}>
                        <Icon className="right addRemoveButton" onClick={(x) => handleShowGrades(user.id)}>{user.areGradesHidden ? "add" : "remove"}</Icon>
                        <img className="userImage left" src={user.pic} />
                        <span className="title userName">{user.firstName} {user.lastName}</span>
                        <div className="indent">
                            <p>Email: {user.email}</p>
                            <p>Company: {user.company}</p>
                            <p>Skill: {user.skill}</p>
                            <p>Average: {user.average}%</p>
                        </div>
                        <div className={(user.areGradesHidden ? "gradesHidden grades" : "gradesNotHidden grades")} id={user.id}>
                            {user.grades.map(grade => (
                                <p>Test 1: {grade}%</p>
                            ))}
                        </div>
                    </CollectionItem>
                )): null}
                
            </Collection>
        </div>
    )
}
