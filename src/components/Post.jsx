import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import FormattedDate from "./formatDate";
import { FaUser } from "react-icons/fa";

const Post = () => {
  const { id } = useParams();
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch post data
        const postResponse = await fetch(
          `http://localhost:8000/api/v1/posts/${id}`
        );
        if (!postResponse.ok) {
          throw new Error("Failed to fetch post data");
        }
        const postData = await postResponse.json();
        setPost(postData);

        // Fetch comments associated with the post
        const commentsResponse = await fetch(
          `http://localhost:8000/api/v1/posts/${id}/comments`
        );
        if (!commentsResponse.ok) {
          throw new Error("Failed to fetch comments");
        }
        const commentsData = await commentsResponse.json();
        const sortedComments = commentsData.data.sort(
          (a, b) => b.id - a.id
        ); // Sort comments by ID in descending order
        setComments(sortedComments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit comment to the server
      const response = await fetch(`http://localhost:8000/api/v1/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          post_id: id,
          content: commentContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      // Clear comment input field after successful submission
      setCommentContent("");

      // Fetch updated comments
      const updatedCommentsResponse = await fetch(
        `http://localhost:8000/api/v1/posts/${id}/comments`
      );
      if (!updatedCommentsResponse.ok) {
        throw new Error("Failed to fetch updated comments");
      }
      const updatedCommentsData = await updatedCommentsResponse.json();
      const sortedComments = updatedCommentsData.data.sort(
        (a, b) => b.id - a.id
      ); // Sort comments by ID in descending order
      setComments(sortedComments);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  return (
    console.log(post),
    (
      <div className="container">
        <div className="col-md-6 col-sm-8 col-12 mx-auto pb-5">
          <div className="card">
            <div className="card-body">
              {post && (
                <>
                  <h2 className="card-title">{post.data.title}</h2>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-2 fw-bold d-flex align-items-center justify-content-center gap-1">
                      <FaUser />
                      <span>{post.data.user.name}</span>
                    </p>
                    <small className="text-muted fw-medium">
                      {<FormattedDate datetimeString={post.data.created_at} />}
                    </small>
                  </div>
                  <p className="card-text post-content">{post.data.content}</p>
                </>
              )}
              {isLoggedIn && (
                <form onSubmit={handleCommentSubmit}>
                  <div className="border mb-3"></div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      id="comment"
                      rows="2"
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </form>
              )}
              <div className="border mt-3"></div>
              <div className="bg-light pt-1 mt-3 rounded">
                <h4 className="text-center h5 mb-0">Comments</h4>
                {!Array.isArray(comments) && comments.length === 0 ? (
                  <p className="text-center">No comments yet...</p>
                ) : (
                  <div className="p-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-2 fw-bold d-flex align-items-center justify-content-center gap-1">
                              <FaUser />
                              <span>{comment.user.name}</span>
                            </p>
                            <small className="text-muted fw-medium">
                              {
                                <FormattedDate
                                  datetimeString={comment.created_at}
                                />
                              }
                            </small>
                          </div>
                          <p className="mb-0">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Post;
