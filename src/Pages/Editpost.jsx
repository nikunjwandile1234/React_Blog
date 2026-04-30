import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";

function EditPost() {
  const [post, setPost] = useState(null); // ✅ renamed
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await service.getPost(id);

        if (res) {
          setPost(res);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("EditPost error:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  // 🔄 LOADING UI
  if (loading) {
    return (
      <div className="w-full py-20 text-center">
        <h1 className="text-xl font-semibold text-gray-600">
          Loading post for editing...
        </h1>
      </div>
    );
  }

  return post ? (
    <div className="py-10 bg-gray-50 min-h-screen">
      <Container>

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Edit Your Post
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow">
          <PostForm post={post} />
        </div>

      </Container>
    </div>
  ) : (
    <div className="w-full py-20 text-center">
      <h1 className="text-xl font-bold text-red-500">
        Post not found
      </h1>
    </div>
  );
}

export default EditPost;