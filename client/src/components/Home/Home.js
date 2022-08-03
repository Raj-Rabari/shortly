import React,{useState} from 'react'
import "./Home.css"
import cover from '../../img/cover-img.png'

import Nav from './Nav'
import axios from 'axios'
import QRCode from 'qrcode.react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {auth,serverUrl} from '../helper/Helper'
function Home() {
const isAuth = auth()
  const [linktext, setlinktext] = useState('')
  const [short, setshort] = useState('')

  const handleText = e => setlinktext(e.target.value)
  let useremail = 'noemail'
  if(isAuth) {
    useremail = isAuth.email
  }


    const handleModal = () => {
     axios.post(serverUrl+'/api/insert',{full: linktext,email: useremail}).then(result => {
       setshort(result.data.link)
       setlinktext('')

     }).catch(err => {
       console.log(err)
     })
      const blur = document.getElementById('blur')
      blur.classList.toggle('active')
      
      const popup = document.getElementById('popup')
      popup.classList.toggle('active')

    }

    const copyUrl = () => {
      navigator.clipboard.writeText(serverUrl+"/"+short)
    }


  return (
    <>

<div className="wrapper" id='blur'>

       <Nav />
        <div className="showcase-area">
          <div className="container">
            <div className="left">
              <div className="big-title">
                <h1>Shorten,</h1>
                <h1>And manage your links.</h1>
              </div>
              <p className="text">
              Free URL shortener to create perfect URLs for your business.<br/>
              <strong>Shorty</strong> helps you create and share links with others.
              </p>
              <input type='text' className='input-field' name="linktext" required value={linktext} onChange={handleText} />
              <div className="cta">
                <button className="btn a" onClick={handleModal}>Shorten</button>
              </div>
            </div>

            <div className="right">
              <img src={cover} alt="cover" className="person" />
            </div>
          </div>
        </div>
      </div>


      {/* popup modal */}

      <div id="popup">
      <h2>Copy Your Link,</h2>
      <QRCode value={serverUrl+short} className='qrimg' />
      <div className='copy-div'>
        <a href={serverUrl+short} className="shortlink" target='_blank'>{short}</a>
        <ContentCopyIcon onClick={copyUrl} className="copybtn" />

      </div>
      <button id="modal-btn" onClick={handleModal}>Close</button>


      </div>       
      {/* <section className="feature">
    <div className="row">
        <div className="text col">
            <h6>JOIN NOE TEAM</h6>
            <h2>Creating account is extreamly easy</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque odio necessitatibus repellendus cupiditate. Tenetur mollitia magni odit expedita minima.</p>
            <Link to="/" className='a'>Learn More</Link>
        </div>

        <div className="img">
            <img src={fimg} alt="svg" />
        </div>
    </div>
</section> */}

    </>
  )
}

export default Home