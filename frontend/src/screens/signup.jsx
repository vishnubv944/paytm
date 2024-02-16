import { BottomWarning } from "../components/ButtonWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios  from 'axios';



function Signup(){

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function signupUser(){
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        "username": email,
        "firstName": firstName,
        "lastName": lastName,
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
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value)
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={e => {
          setLastName(e.target.value)
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e => {
          setEmail(e.target.value)
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox type="password" onChange={e => {
          setPassword(e.target.value)
        }} label={"Password"} />
        <div className="pt-4">
          <Button onClick={signupUser}  label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}
export default Signup