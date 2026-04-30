import React from "react";
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./index";

function PostCard({ $id, Title, featuredImage, User_id }) {
  console.log("\nDaata =", { $id, Title, featuredImage, User_id });
  

  const featuredImagePreview = service.getFileView(featuredImage);
  console.log("Preview URL:", featuredImagePreview);



  const navigate = useNavigate();

  const userData = useSelector((state) => state.authreducer.userData);

  const isAuthor =
    userData?.$id && User_id ? String(userData.$id) === String(User_id) : false;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition">
      {/* CLICKABLE CONTENT */}
      <div onClick={() => navigate(`/post/${$id}`)} className="cursor-pointer">
        {/* IMAGE */}
        {featuredImage ? (
          <img
            src={featuredImagePreview}
            alt={Title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="h-48 bg-gray-300 flex items-center justify-center rounded-lg mb-4">
            No Image
          </div>
        )}

        {/* TITLE */}
        <h2 className="text-lg font-bold">{Title}</h2>
      </div>

      {/* AUTHOR ACTIONS */}
      {isAuthor && (
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => navigate(`/edit-post/${$id}`)}
            bgcolor="bg-green-500"
          >
            Edit
          </Button>

          <Button
            onClick={async () => {
              const confirmDelete = confirm("Delete this post?");
              if (!confirmDelete) return;

              const status = await service.deletePost($id);
              if (status) {
                if (featuredImage) {
                  await service.deleteFile(featuredImage);
                }
                window.location.reload();
              }
            }}
            bgcolor="bg-red-500"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default PostCard;
