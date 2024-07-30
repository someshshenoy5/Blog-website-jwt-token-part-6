// import axios from 'axios';
// import { useContext } from 'react';
// import { AppContext } from './AppContext';
// import { useNavigate } from 'react-router-dom';

// const apiUrl = 'http://localhost:8080/api/blogs';

// export const fetchBlogs = async (token) => {
//   const {token} = useContext(AppContext)
//   console.log('token in api' , token)
//   const navigate = useNavigate()
//   if (!token) {
//     navigate('/login');
//     return;
//   }
//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },  
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('backend not running');

//   }
// };
// export const fetchBlogById = async (id,token) => {
//   const {token} = useContext(AppContext)
//   const navigate = useNavigate()
//   if (!token) {
//     navigate('/login');
//     return;
//   }
//   const response = await fetch(`${apiUrl}/${id}`);
//   if (!response.ok) {
//     throw new Error('Failed to fetch blog');
//   }
//   const data = await response.json();
//   console.log(data);
//   return data;
// };

import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/blogs';

export const fetchBlogs = async (token) => {
  if (!token) {
    throw new Error('No token provided');
  }
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('backend not running');
  }
};

export const fetchBlogById = async (id, token) => {
  if (!token) {
    throw new Error('No token provided');
  }
  try {
    const response = await axios.get(`${apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch blog');
  }
};

