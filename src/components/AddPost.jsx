import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Import the AuthContext

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]); // Define categories state
  const { userId, isLoggedIn } = useContext(AuthContext); // Access userId and isLoggedIn from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories data from API and set in state
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData = await response.json();
        // Assuming categoriesData is an array of category objects with properties 'id' and 'name'
        // You can adjust the property names accordingly
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        title: title,
        content: content,
        user_id: userId,
        category_id: categoryId,
      };

      const response = await fetch("http://localhost:8000/api/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.errors
            ? responseData.errors.join(", ")
            : "Failed to add post"
        );
      }

      // Clear input fields after successful submission
      setTitle("");
      setContent("");
      setCategoryId("");

      // Display success message
      setSuccess("Post added successfully");

      // Redirect user to another page after successful submission
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error adding post:", error);
      // Display error message
      setError(error.message || "Failed to add post");
    }
  };

  // Redirect to home page if user is not logged in
  if (!isLoggedIn) {
    navigate("/");
    return null; // Return null to prevent rendering anything else
  }

  return (
    <div className="container">
      <div className="col-md-6 col-sm-8 col-12 mx-auto pb-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center">Add Post</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  value={categoryId}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select category...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  className="form-control"
                  id="content"
                  rows="5"
                  value={content}
                  onChange={handleContentChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
