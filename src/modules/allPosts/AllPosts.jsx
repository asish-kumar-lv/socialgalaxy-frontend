import React, { useContext, useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { PostContext } from "../../context/PostContext";
import WritePost from "../AddPost/WritePost";
import * as requestManager from "../../utils/requestManager";
import { toast } from "react-hot-toast";

const AllPosts = () => {
  const { showAddPost } = useContext(PostContext);
  const [allPosts, setAllPosts] = useState([]);
  const getAllPosts = async (values) => {
    try {
      const response = await requestManager.apiGetWithToken(
        "/post/allPosts",
        values
      );
      if (response?.data) {
        setAllPosts(response?.data?.data ?? []);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message ?? "something went wrong");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {showAddPost ? <WritePost reload={getAllPosts} /> : null}
      {allPosts?.length
        ? allPosts.map((post) => <Post post={post} key={post?._id} />)
        : null}
    </>
  );
};

export default AllPosts;
