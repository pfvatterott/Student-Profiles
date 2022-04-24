import React, { useState, useEffect } from "react";
import { Collection, CollectionItem } from 'react-materialize'

export default function CollectionList(props) {
    const [userInfo, setUserInfo] = useState([])

    useEffect(() => {
        console.log(props.userData)
        findAverages(props.userData)
    }, [props.userData])

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
        console.log(tempUser)
    }

    return (
        <div>
            <Collection>
                {userInfo.length > 0 ? userInfo.map(user => (
                    <CollectionItem className="avatar">
                        <img className="circle" src={user.pic} />
                        <span className="title">{user.firstName} {user.lastName}</span>
                        <p>Email: {user.email}</p>
                        <p>Company: {user.company}</p>
                        <p>Skill: {user.skill}</p>
                        <p>Average: {user.average}%</p>
                    </CollectionItem>
                )): null}
                
            </Collection>
        </div>
    )
}
