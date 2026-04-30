import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector(
    (state) => state.authreducer.userData
  );

  // ✅ correct author check
  const isAuthor =
    userData?.$id && post?.User_id
      ? String(userData.$id) === String(post.User_id)
      : false;

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
       // api call from backend 
    service.getPost(id).then((res) => {
      if (res) setPost(res);
      else navigate("/");
    });
  }, [id, navigate]);

  const deletePost = async () => {
    const confirmDelete = confirm("Delete this post?");
    if (!confirmDelete) return;

    const status = await service.deletePost(post.$id);

    if (status) {
      if (post.featuredImage) {
        await service.deleteFile(post.featuredImage);
      }
      navigate("/");
    }
  };

  if (!post) {
    return (
      <div className="w-full py-20 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>

        {/* IMAGE */}
        {post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={service.getFileView(post.featuredImage)}
              alt={post.Title}
              className="rounded-xl w-full max-h-[400px] object-cover"
            />
          </div>
        )}

        {/* BUTTONS */}
        {isAuthor && (
          <div className="mb-4 flex gap-2">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgcolor="bg-green-500">
                Edit
              </Button>
            </Link>

            <Button bgcolor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-4">
          {post.Title}
        </h1>

        {/* CONTENT */}
        <div>
          {post?.content && parse(post.content)}
        </div>

      </Container>
    </div>
  );
}