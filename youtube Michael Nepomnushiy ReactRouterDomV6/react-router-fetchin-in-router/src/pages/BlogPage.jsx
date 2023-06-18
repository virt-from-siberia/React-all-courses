import React from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";

import { BlogFilter } from "../components/BlogFilter";

export const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const posts = useLoaderData();

  const postQuery = searchParams.get("post") || "";
  const latest = searchParams.get("latest") || false;

  const startsFrom = latest ? 80 : 1;

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

export const blogLoader = async ({ request, params }) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};
