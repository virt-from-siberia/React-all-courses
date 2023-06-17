import React from "react";
import { Link, useNavigate, useLoaderData } from "react-router-dom";

export const SinglePage = () => {
  const navigate = useNavigate();
  const { post, id } = useLoaderData();

  const goBack = () => navigate(-1);
  const goHome = () =>
    navigate("/", { replace: true, state: { existedProp: true } });

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <button onClick={goHome}>Go home</button>
      {post && (
        <>
          <h3>{post && post?.title}</h3>
          <p>{post && post?.body}</p>1
          <Link to={`/posts/${id}/edit`}>Edit post</Link>
        </>
      )}
    </div>
  );
};

export const singlePostLoader = async ({ request, params }) => {
  const id = params.id;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return { post, id };
};
