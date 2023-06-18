import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const goBack = () => navigate(-1);
  const goHome = () =>
    navigate("/", { replace: true, state: { existedProp: true } });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <button onClick={goHome}>Go home</button>
      <h3>{post && post?.title}</h3>
      <p>{post && post?.body}</p>
      <Link to={`/posts/${id}/edit`}>Edit post</Link>
    </div>
  );
};
