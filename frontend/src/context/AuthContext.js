import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../services/getCurrentUser';
import { getCurrentCompany } from '../services/getCurrentCompany';
import isLoggedIn from '../actions/isLoggedIn';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [company, setCompany] = useState(null);

    const login = async (email, password) => {
        const response = await axios.post('http://127.0.0.1:8000/user/login/api/', { email, password }, 
            {headers: {'Content-Type': 'application/json'}, withCredentials: true});

        if (response) {
          const token =  response.data.jwt;
          
          const currentUser = await getCurrentUser();
          const currentCompany = await getCurrentCompany();
          if(token != null) {
            localStorage.setItem("jwtToken", token);
            setUser(currentUser);
            setCompany(currentCompany);
          }
        }
    };

    const logout = async () => {
        await axios.post('http://127.0.0.1:8000/user/logout/api/', {}, {withCredentials: true});
        localStorage.removeItem('jwtToken');
        setUser(null);
        setCompany(null);
    };

    const register = async (name, email, password, companyName) => {
        const response = await axios.post("http://127.0.0.1:8000/company/api/", {name: companyName, currency_id: ""});
        if (response) {
            await axios.post('http://127.0.0.1:8000/user/register/api/', {name, email, password, company_id: response.data.id, role_id: ""}, 
                {headers: {'Content-Type': 'application/json'}, withCredentials: true}).catch(error => {console.error(error);});
        }
    };
    
    useEffect(() => {
          const fetchData = async() => {
            if (isLoggedIn()) {
              const currentUser = await getCurrentUser();
              
              if (currentUser) {
                const currentCompany = await getCurrentCompany();

                setUser(currentUser);
                setCompany(currentCompany);
              }
            } else {
              
            }
          }
      
          fetchData();
    }, [])

    return (
        
        <AuthContext.Provider value={{ user, company, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};