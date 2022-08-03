import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Nav from '../Home/Nav'
import './auth.css'
import bg from '../../img/signup-bg.png'
import axios from 'axios'
import {auth, serverUrl} from '../helper/Helper'
function Signup() {
	const isAuth = auth()
const navigate = useNavigate()
   const [formdata, setformdata] = useState({
	   name: "",
	   email: "",
	   password: "",
	   cpassword: ""
   })


   const handleChange = text => e => {
	   setformdata({...formdata,[text]: e.target.value})
   }


   const handleSubmit = e => {
	   
	e.preventDefault();
	   if(formdata.password.length < 6) {
		   alert("password must be atleast 6 characters")
	   }
	   else if(formdata.password!==formdata.cpassword) {
		   alert("Password does not match")
	   }
	   else{
		   const data = {
			   name: formdata.name,
			   email: formdata.email,
			   password: formdata.password
		   }

			
		   axios.post(serverUrl+"/api/register",data).then(res => {
			   if(res.data.success){
				   alert('Account created successfully \n Please login to your account')
				   navigate('/login')
				
			   }
			   else{
				   alert('error')
			   }
		   }).catch(err => console.log(err))
		   
	   }
	   

   }





  return (
      <>
	  



  {isAuth!==false && navigate('/')}
          {!isAuth && <Nav />}

		  {!isAuth && 
	<section>
		<div className='imgbx'>
		<img src={bg} alt="bg" />
		</div>

		
		<div className='contentbx'>
		<div className='formbx'>
			<h2>Signup</h2>
			<form onSubmit={handleSubmit}>

			<div className='inputbx'>
				<span>Name</span>
				
	  <input type="text" class="input" name="name" value={formdata.name} onChange={handleChange("name")} required />
			</div>


			<div className='inputbx'>
				<span>EMail</span>
				
	  <input type="Email" class="input" name="email" value={formdata.email} onChange={handleChange("email")} required />
			</div>

			
			<div className='inputbx'>
				<span>Password</span>
				
	  <input type="password" placeholder='Atleast 6 characters' class="input" name="password" value={formdata.password} onChange={handleChange("password")} required />
			</div>

			
			<div className='inputbx'>
				<span>Confirm Password</span>
				
	  <input type="password" class="input" name="cpassword" value={formdata.cpassword} onChange={handleChange("cpassword")} required />
			</div>
			<div className='inputbx'>
				<input type="submit" value="Signup" />
			</div>

			</form>
			</div>
		</div>

	</section>}
      </>

  )
}

export default Signup