
import cookie from 'js-cookie'
const SETNAME = "dgfgxvdvsr45gn656vck"
const SETEMAIL = "iorjgojgoidnvonlk"
export const setCookie = (name,email) => {
    cookie.set(SETNAME,name,{expires: 2})
    cookie.set(SETEMAIL,email,{expires: 2})
}
export const serverUrl = "http://localhost:8000";
export const removeCookie = () => {
    
    cookie.remove(SETEMAIL,{expires: 2})
    
    cookie.remove(SETNAME,{expires: 2})
}

export const getCookie = () => {
    const name = cookie.get(SETNAME)
    const email = cookie.get(SETEMAIL)
    if(name && email)
        return {name,email}
    else
        return null

}


export const auth = () => {
   const token = getCookie();
    if(token){
        return token
    }
    else{
        return false
    }
}