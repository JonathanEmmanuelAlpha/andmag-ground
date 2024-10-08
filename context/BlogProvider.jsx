import { useRouter } from "next/router";
import React, { useContext } from "react";
import { blogsCollection } from "../firebase";
import useBlog from "../hooks/useBlog";
import useBlogFollowers from "../hooks/useBlogFollowers";
import useIsOwner from "../hooks/useIsOwner";
import { useAuth } from "./AuthProvider";

const BlogContext = React.createContext();

export function useTargetBlog() {
  return useContext(BlogContext);
}

export default function BlogProvider({ children }) {
  const router = useRouter();

  const { blog, create, error, loading, loadingBlog } = useBlog(
    router.query.blogId
  );
  const followers = useBlogFollowers(blog?.id);

  const { currentUser } = useAuth();
  const isOwner = useIsOwner(currentUser, blogsCollection, blog?.id);

  const value = {
    blog,
    followers,
    isOwner,
    create,
    error,
    loading,
    loadingBlog,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
