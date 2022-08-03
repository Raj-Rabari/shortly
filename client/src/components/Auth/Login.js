import React,{useState} from 'react'
import Nav from '../Home/Nav'
import './auth.css'
import bg from '../../img/mobile-login.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {setCookie,auth,serverUrl} from '../helper/Helper'



function Login() {
  const isAuth = auth()
	const navigate = useNavigate()
	const [formdata, setformdata] = useState({
		email: "",
		password: ""
	})

	const handleChange = text => e => {setformdata({...formdata,[text]:e.target.value})}

	const handleSubmit = e => {
		e.preventDefault()
		const data = {
			email: formdata.email,
			password: formdata.password
		}
		axios.post(serverUrl+"/api/login",data).then(result => {
			if(result.data.suceess){
				
				setCookie(result.data.name,result.data.email)
				navigate('/')
			}
			else{
				alert(result.data.error)
			}
		}).catch(err => {console.log(err)})

	}

  return (
      <>

          
		  {isAuth && navigate('/')}
{!isAuth && <Nav />}
		  {!isAuth && 
	<section>
		<div className='imgbx'>
		<img src={bg} alt="bg" />
		</div>

		
		<div className='contentbx'>
		<div className='formbx'>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>

			<div className='inputbx'>
				<span>EMail</span>
				
				<input type="email" class="input" value={formdata.email} onChange={handleChange('email')} name="email" required />
			</div>

			
			<div className='inputbx'>
				<span>Password</span>
				
				<input type="password" class="input" value={formdata.password} onChange={handleChange('password')} name="password" required />
			</div>
			<div className='inputbx'>
				<input type="submit" value="Login" />
			</div>

			</form>
			</div>
		</div>

	</section>}

      </>

  )
}

export default Login