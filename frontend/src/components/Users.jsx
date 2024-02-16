import { useState, useEffect } from "react"
import { Button } from "./Button"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Users = () => {
    const [searchName, setSearchName] = useState('')
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token')
    useEffect(()=>{
        try {
            if(searchName != ''){
                axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${searchName}`, {headers: {
                    'authorization': `Bearer ${token}`
                    }})
                .then(response => {
                    console.log(response.data.users)
                    if(response.status == 200){
                        
                        setUsers(response.data.users)
                    }
                })
            }
            else{
                setUsers([])
            }
          } 
          catch (error) {
            console.error(error);
          }
    }, [searchName])





    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={e => {
                console.log(e.target.value)
                setSearchName(e.target.value)

            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users ? users.map(user => <User user={user} />) : null}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate()
    console.log(user)
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate(`/send?id=${user._id}&name=${user.firstName}`)
            }}  label={"Send Money"} />
        </div>
    </div>
}