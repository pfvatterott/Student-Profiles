import React, { useState, useEffect } from "react";
import { Collection, CollectionItem, Icon, Button } from 'react-materialize'
import FilterInput from "../FilterInput";
import TagInput from "../TagInput";
import TagFilterInput from "../TagFilterInput";
import "./style.css"

export default function CollectionList(props) {
    const [userInfo, setUserInfo] = useState([])
    const [nameFilter, setNameFilter] = useState('')
    const [tagFilter, setTagFilter] = useState('')
    const [forceUpdate, setForceUpdate] = useState(0)

    useEffect(() => {
        let tempUserArray = props.userData
        tempUserArray.forEach(user => {
            if (user.areGradesHidden === null || !user.areGradesHidden) {
                user.areGradesHidden = true
            }
        });
        if(nameFilter === '' && tagFilter === '') {
            findAverages(tempUserArray)
        }
        else {
            filterResults(tempUserArray)
        }
    }, [props.userData, nameFilter, tagFilter])

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
        const filteredUsersWithTags = filteredUsers.filter(user => {
            if (user.tags && tagFilter !== '') {
               return user.tags.some(tag => tag.includes(tagFilter.toLowerCase()))
            }
            else if (!user.tags && tagFilter !== '') {
                return false
            }
            else {
                return filteredUsers
            }
        })
        findAverages(filteredUsersWithTags)
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
        setUserInfo(tempUserInfo)
        setForceUpdate(forceUpdate + 1)
    }

    function handleNewTag(tag, id) {
        let newTagValue = tag.toLowerCase()
        let userData = userInfo
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].id === id && userData[i].tags) {
                userData[i].tags.push(newTagValue)
            }
            else if (userData[i].id === id && !userData[i].tags) {
                userData[i].tags = [newTagValue]
            }
        }
        setUserInfo(userData)
        setForceUpdate(forceUpdate + 1)
    }

    function handleSetTagFilter(x) {
        setTagFilter(x)
    }

    return (
        <div>
            <Collection>
                <FilterInput nameFilter={nameFilter} setNameFilter={(x) => handleSetNameFilter(x)}/>
                <TagFilterInput tagFilter={tagFilter} setTagFilter={(x) => handleSetTagFilter(x)}/>
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
                            <ol className="gradeList">
                            {user.grades.map(grade => (
                                <div key={user.id + " " + Math.random()}><p className="left">Test</p><li className="gradeListItem">:&nbsp;&nbsp;&nbsp;{grade}%</li></div>
                            ))}
                            </ol>
                        </div>
                        <div className="tags">
                            {user.tags ? user.tags.map(tag => (
                                <Button
                                    disabled
                                    id="tagButton"
                                >
                                {tag}
                                </Button>
                            )):null}
                        </div>
                        <TagInput id={user.id} handleNewTag={(x, y) => handleNewTag(x, y)}/>
                    </CollectionItem>
                )): null}
                
            </Collection>
        </div>
    )
}
