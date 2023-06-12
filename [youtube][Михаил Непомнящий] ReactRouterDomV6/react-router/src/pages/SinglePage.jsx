import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const SinglePage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  console.log("post", post);

  return (
    <div>
      <h3>{post && post?.title}</h3>
      <p>{post && post?.body}</p>
      <Link to={`/posts/${id}/edit`}>Edit post</Link>
    </div>
  );
};
