import React, { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/getCurrentUser';
import { getCurrentCompany } from '../services/getCurrentCompany';
import isLoggedIn from '../actions/isLoggedIn';
import API from '../services/api';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [company, setCompany] = useState(null);

    const login = async (email, password) => {
        const response = await axios.post('http://127.0.0.1:8000/user/login/api/', { email, password });

        if (response) {
          const token =  response.data.access;
          
          if(token != null) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('refresh_token', response.data.refresh);
            API.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            const currentUser = await getCurrentUser();
            const currentCompany = await getCurrentCompany();
            setUser(currentUser);
            setCompany(currentCompany);
          }
        }
    };

    const logout = async () => {
        await API.post('/user/logout/api/', {});
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete API.defaults.headers.common['Authorization'];
        setUser(null);
        setCompany(null);
    };

    const register = async (name, email, password, companyName) => {
        const response = await API.post("/company/api/", {name: companyName, currency_id: ""});
        if (response) {
            await API.post('/user/register/api/', {name, email, password, company_id: response.data.id, role_id: ""}, 
                {headers: {'Content-Type': 'application/json'}}).catch(error => {console.error(error);});
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