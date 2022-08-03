import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link, useNavigate,use } from 'react-router-dom'
import { auth, serverUrl } from '../helper/Helper'
import editico from '../../img/editico.png'
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import './Home.css'
import Nav from './Nav'

function Links() {
    const navigate = useNavigate()
    const [modal, setmodal] = useState(false);
    const [newshort, setnewshort] = useState('')
const isAuth = auth()
let useremail = ''
if(isAuth){
useremail = isAuth.email
}  
const [myArray, setmyArray] = useState([]);
const [exist, setexist] = useState(false);
const [oldshort, setoldshort] = useState('')
const redirect = () => {
    navigate('/');
}

const handleModal = () => {
    const popup = document.querySelector("#popup");
    popup.classList.toggle('active')
    setmodal(!modal)
}

const handleEdit = () => {
    handleModal();
    if(newshort===""){
        alert("please enter new URL");
    }
    else{
        axios.post(serverUrl+"/api/edit",{email: useremail,short: oldshort,newshort: newshort}).then(result => {
            if(result.data.success){
                alert(result.data.message)
                window.location.reload();
                setnewshort('');
            }
            else{
                alert(result.data.error)
                setnewshort('')
            }
        })
    }
}

    useEffect(() => {
        axios.post(serverUrl+"/api/getdata",{email: useremail}).then(res => {
        if(res.data.success){
            setmyArray(res.data.urls);
            
            
            setexist(true)

        }
        else{
            alert(res.data.error)
        }
    }).catch(err => {console.log(err)})
    }, [useremail])
  return (
      <>
      {!isAuth && redirect()}
      {isAuth && <Nav />}
    
  {isAuth && exist &&
      <div className='table-div'>
      <h1 className='table-text'> Your Links</h1>
      <table>

<tr id="header">
<th>Date</th>
<th>Shorten link</th>
<th>Full Url</th>
<th>Clicks</th>
<th>Edit shortURL</th>
</tr>
{myArray.map((value) => {
let date = String(Date(value.updateAt)).split(" ");
    return(
      <>
      <tr>
          <td>{date[0]+" "+date[1]+" "+date[2]+" "+date[3]}</td>
          <td><a href={serverUrl+"/"+value.short} target="_blank">{value.short}</a></td>
          
          <td><a href={value.full} target="_blank">{value.full.length>100 ? String(value.full).substring(0,50) : value.full}</a></td>
          
          <td>{value.clicks}</td>
          <td><span className='editicon' onClick={() => {
              setoldshort(value.short)
              handleModal();
          }} style={{fill: "white"}}>
              <img src={editico} alt="edit" />
          </span></td>
          

       </tr>
</>
    )
})}

</table>
      </div>}



<div id="popup">

<div className='inputbox'>
<h2>Edit Short URL</h2>
				<span>Enter new short text</span>
				<input type="text" value={newshort} autoComplete="off" onChange={(e)=>{setnewshort(e.target.value)}} name="text" required />
                <button className='editBtn' onClick={handleEdit}>Edit</button>
			</div>
            <CloseOutlined className='editclose' onClick={handleModal} />

      </div>    

      </>
  )
}

export default Links