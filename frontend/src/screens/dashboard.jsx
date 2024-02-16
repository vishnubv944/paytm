import { useEffect, useState } from 'react'
import {Appbar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import {Users} from '../components/Users'
import axios from 'axios'

function Dashboard(){
    const token = localStorage.getItem('token')
    const [data, setData] = useState({
        balance: 0,
        name: ''
    })
    useEffect(()=>{
        try {
            
            axios.get(`http://localhost:3000/api/v1/account/balance`, {headers: {
            'Authorization': `Bearer ${token}`
            }})
            .then(response => {
                if(response.status == 200){
                        setData({
                            balance: response.data.balance,
                            name: response.data.firstName
                        })
                }
            })
            
          } 
          catch (error) {
            console.error(error);
          }
    }, [])

    return(
        <div className='mx-5'>
            
            <Appbar name={data.name} />
            <Balance value={data.balance} />
            <Users />
        </div>
    )
}
export default Dashboard