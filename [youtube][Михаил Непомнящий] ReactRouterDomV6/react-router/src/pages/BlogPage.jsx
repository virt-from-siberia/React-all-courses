import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <h1>BlogPage</h1>
      {posts.map((post) => {
        return (
          <Link key={post.id} to={`${post.id}`}>
            <li>{post.title}</li>
          </Link>
        );
      })}
    </>
  );
};
