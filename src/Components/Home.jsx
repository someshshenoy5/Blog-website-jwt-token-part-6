// import React, { useContext, useEffect } from "react";
// import { AppContext } from "../AppContext";
// import disconnected from "../assets/unplugged.png";
// import { Link, useNavigate } from "react-router-dom";

// const Home = () => {
//   const { blogs, isError,token } = useContext(AppContext);
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//       return;
//     }
//   }, [token]);

//   if (isError) {
//     return (
//       <div className="disconnected">
//         <img src={disconnected} alt="Something went Wrong" />
//         <h4 className="disconnected-message">Start the server</h4>
//       </div>
//     );
//   }

//   return (
//     <div className="article-page">
//       <div className="article-grid">
//         {blogs.map((blog) => (
//           <article key={blog.blogId}>
//             <div className="article-card">
//               {/* <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
//                 alt="Article Image"
//                 className="article-image"
//               /> */}
//               <div className="article-content">
//                 <h2 className="article-title poppin-text">{blog.blogTitle}</h2>
//               </div>
//               <div className="article-para">
//                 <p className="article-summar textcut-off playwrite-mx-para ">
//                   {blog.content}
//                 </p>
//                 <input type="checkbox" className="expand-btn" />
//               </div>
//               <div className="article-meta">
//                 <span className="article-author poppin-text">
//                   By {blog.authorName}
//                 </span>

//                 <Link
//                   to={`/article/${blog.blogId}`}
//                   className="article-read-more"
//                 >
//                   <span className="playwrite-mx-para">Read More</span>
//                 </Link>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import disconnected from "../assets/unplugged.png";
import { Link, useNavigate } from "react-router-dom";
import { fetchBlogs } from '../api'; // Import the function

const Home = () => {
  const { token, setToken } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const getBlogs = async () => {
      try {
        const data = await fetchBlogs(token);
        setBlogs(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
        if (!error.response || error.response.status === 401) {
          setToken(null);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    getBlogs();
  }, [token, navigate, setToken]);

  if (isError) {
    return (
      <div className="disconnected">
        <img src={disconnected} alt="Something went wrong" />
        <h4 className="disconnected-message">Start the server</h4>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="article-grid">
        {blogs.map((blog) => (
          <article key={blog.blogId}>
            <div className="article-card">
              <div className="article-content">
                <h2 className="article-title poppin-text">{blog.blogTitle}</h2>
              </div>
              <div className="article-para">
                <p className="article-summar textcut-off playwrite-mx-para ">
                  {blog.content}
                </p>
                <input type="checkbox" className="expand-btn" />
              </div>
              <div className="article-meta">
                <span className="article-author poppin-text">
                  By {blog.authorName}
                </span>

                <Link
                  to={`/article/${blog.blogId}`}
                  className="article-read-more"
                >
                  <span className="playwrite-mx-para">Read More</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
