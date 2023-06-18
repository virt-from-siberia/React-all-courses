import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export const CreatePost = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <h1>Create post</h1>
      <button onClick={() => signOut(() => navigate("/", { replace: true }))}>
        Log out
      </button>
    </>
  );
};
