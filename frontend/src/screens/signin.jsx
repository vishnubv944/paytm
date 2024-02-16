import { BottomWarning } from "../components/ButtonWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from 'axios'

function Signin(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signinUser(){
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        "username": email,
        "password": password
      });
      console.log(response);
      if(response.status == 200){
        localStorage.setItem("token", response.data.token)
        window.location.href = '/dashboard'
      }
    } 
    catch (error) {
      console.error(error);
    }
  } 


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
          setEmail(e.target.value)
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox type="password"  onChange={e => {
          setPassword(e.target.value)
        }} label={"Password"} />
        <div className="pt-4">
          <Button onClick={signinUser} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}
export default  Signin