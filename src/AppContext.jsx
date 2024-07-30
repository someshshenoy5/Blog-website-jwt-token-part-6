// import { createContext, useState, useEffect } from "react";
// import { fetchBlogs, fetchBlogById } from "./api";

// const AppContext = createContext();

// const AppProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState([]);
//   const [isError, setError] = useState(null);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     const fetchBlogsData = async () => {
//       try {
//         const data = await fetchBlogs();
//         setBlogs(data);
//       } catch (error) {
//         setError(error);
//       }
//     };
//     fetchBlogsData();
//   }, []);

//   const getBlogById = async (id) => {
//     try {
//       const blog = await fetchBlogById(id);
//       setSelectedBlog(blog);
//     } catch (error) {
//       setError(error);
//     }
//   };

//   const refreshPage = () => {
//     window.location.reload();
//   };

//   return (
//     <AppContext.Provider
//       value={{ blogs, isError, getBlogById, selectedBlog, refreshPage, token }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export { AppProvider, AppContext };

import React, { createContext, useState, useEffect } from "react";
import { fetchBlogs, fetchBlogById } from "./api";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [isError, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchBlogsData = async () => {
      if (!token) return;
      try {
        const data = await fetchBlogs(token);
        setBlogs(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchBlogsData();
  }, [token]);

  const getBlogById = async (id) => {
    try {
      const blog = await fetchBlogById(id, token);
      setSelectedBlog(blog);
    } catch (error) {
      setError(error);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{ blogs, isError, getBlogById, selectedBlog, refreshPage, token, setToken }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
