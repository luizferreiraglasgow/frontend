import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormattedDate from "./formatDate";
import Excerpt from "./Excerpt";
import { FaEye, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Latest Posts</h1>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-lg-4 mb-4">
            <div className="card h-100 card-post">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text d-flex justify-content-between align-items-center">
                  <Link
                    className="badge bg-info text-decoration-none d-flex align-items-center justify-content-center gap-1"
                    to={`/user/${post.user.id}`}
                  >
                    <FaUser />
                    <span>{post.user.name}</span>
                  </Link>
                  <small className="text-secondary">
                    <FormattedDate datetimeString={post.created_at} />
                  </small>
                </p>
                <p className="card-text">
                  <Excerpt text={post.content} />
                </p>
                <a href={`/posts/${post.id}`} className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-1">
                  <FaEye /><span>View</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
