import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
           // api call from backend to get all posts
        const res = await service.getPosts(); // ✅ FIXED

        if (res) {
          setPosts(res.documents);
        }
      } catch (error) {
        console.log("Home error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <div className="w-full py-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-600">
          Loading posts...
        </h1>
      </div>
    );
  }

  // 🚫 EMPTY STATE
  if (posts.length === 0) {
    return (
      <div className="w-full py-20 text-center">
        <Container>
          <h1 className="text-3xl font-bold text-gray-700">No Posts Yet 🚀</h1>
          <p className="text-gray-500 mt-2">
            Start by creating your first post
          </p>
        </Container>
      </div>
    );
  }

  // ✅ POSTS GRID
  return (
    <div className="w-full py-10 bg-gray-50 min-h-screen">
      <Container>
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Latest Posts</h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
