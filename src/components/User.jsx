import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FormattedDate from "./formatDate";
import Excerpt from "./Excerpt";
import { FaEye, FaUser } from "react-icons/fa";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user details
    fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user:", error));

    // Fetch posts related to the user
    fetch(`http://127.0.0.1:8000/api/v1/users/${userId}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data.posts.sort((a, b) => b.id - a.id))) // Sort posts in descending order of ID
      .catch((error) => console.error("Error fetching user posts:", error));
  }, [userId]);

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h1 className="text-center mb-4">User Profile</h1>
          <div className="mb-4">
            <h2>Name: {user.name}</h2>
            <h5>Email: {user.email}</h5>
          </div>
          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="col-lg-4 mb-4">
                <div className="card h-100 card-post">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text d-flex justify-content-between align-items-center">
                      <Link
                        className="badge bg-info text-decoration-none d-flex align-items-center justify-content-center gap-1"
                        to={`/user/${user.id}`}
                      >
                        <FaUser />
                        <span>{user.name}</span>
                      </Link>
                      <small className="text-secondary">
                        <FormattedDate datetimeString={post.created_at} />
                      </small>
                    </p>
                    <p className="card-text">
                      <Excerpt text={post.content} />
                    </p>
                    <a
                      href={`/posts/${post.id}`}
                      className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-1"
                    >
                      <FaEye />
                      <span>View</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
