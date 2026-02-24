import { useContext, createContext,useState, useEffect} from "react";
import api from "../api/axios";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const[loading, setLoading]= useState(true);

    useEffect(()=>{
        const token  = localStorage.getItem('token');
        if(token){
            api.get('/me')
            .then(response => setUser(response.data))
            .catch(()=> localStorage.removeItem('token'))
            .finally(()=>setLoading(false))
        } else{
            setLoading(false)
        }
    },[]);

    const login= async(email, password)=>{
        const response = await api.post('/login', {email, password})
        localStorage.setItem('token', response.data.access_token)
        setUser(response.data.user)
    }

    const register = async(name, email, password, password_confirmation)=>{
        const response = await api.post('/register',{
            name,
            email,
            password,
            password_confirmation,
        });
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data.user);
    }

    const logout = async ()=>{
        await api.post('/logout');
        localStorage.removeItem('token');
        setUser(null)

    }
  return (
    <AuthContext.Provider value={{user, login, register, logout, loading}}>
        {children}
    </AuthContext.Provider>
  )
}


export const useAuth = ()=>{
    return useContext(AuthContext);
}