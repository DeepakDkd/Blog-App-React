import React, { useState, useEffect } from "react";
import { PostForm } from "../Components";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="EditPost">
      <h1>Edit your post</h1>
      <PostForm post={post} />
    </div>
  ) : null;
}

export default EditPost;
