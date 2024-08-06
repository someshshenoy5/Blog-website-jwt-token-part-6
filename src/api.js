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

export const loginUser = async (userName, password) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/login", {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to login');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/addUser", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to register user');
  }
};
