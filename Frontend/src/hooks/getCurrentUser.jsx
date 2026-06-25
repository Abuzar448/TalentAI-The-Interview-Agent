import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'


const getCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async ()=>{
      try { 
        const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/currentUser`, {withCredentials:true});
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);
}

export default getCurrentUser;