import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { BlogFilter } from "../components/BlogFilter";

export const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get("post") || "";
  const latest = searchParams.get("latest") || false;

  const startsFrom = latest ? 80 : 1;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <h1>BlogPage</h1>
      <BlogFilter
        setSearchParams={setSearchParams}
        postQuery={postQuery}
        latest={latest}
      />
      <Link to="/posts/new">Add new post</Link>
      {posts
        .filter(
          (post) => post.title.includes(postQuery) && post.id >= startsFrom
        )
        .map((post) => {
          return (
            <Link key={post.id} to={`${post.id}`}>
              <li>{post.title}</li>
            </Link>
          );
        })}
    </>
  );
};
