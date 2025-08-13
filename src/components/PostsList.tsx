import React, { useEffect, useState } from "react";
import { postApi } from "../api/post";
import { PostType } from "../types/posts";
import ModalPost from "./ModalPost";

const PostsList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const data = await postApi.getPosts();
      setPosts(data);
    };
    getPosts();
  }, []);

  const handleAddPost = () => {
    if (!newTitle.trim() || !newBody.trim()) return;

    const newPost: PostType = {
      userId: Date.now(),
      id: Date.now(),
      title: newTitle,
      body: newBody,
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewBody("");
  };

  const handleToggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setDislikedPosts(dislikedPosts.filter(id => id !== postId));
    }
  };

  const handleToggleDislike = (postId: number) => {
    if (dislikedPosts.includes(postId)) {
      setDislikedPosts(dislikedPosts.filter(id => id !== postId));
    } else {
      setDislikedPosts([...dislikedPosts, postId]);
      setLikedPosts(likedPosts.filter(id => id !== postId));
    }
  };

  const handleFavorite = (postId: number) => {
    setFavorites(favorites.includes(postId)
      ? favorites.filter(id => id !== postId)
      : [...favorites, postId]
    );
  };

  const displayedPosts = showFavorites
    ? posts.filter(post => favorites.includes(post.id))
    : posts;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-indigo-600">Посты</h2>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
        >
          {showFavorites ? "Все посты" : "Избранное"}
        </button>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-md shadow-sm">
        <input
          type="text"
          placeholder="Заголовок поста"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Текст поста"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          rows={3}
        />
        <button
          onClick={handleAddPost}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Добавить пост
        </button>
      </div>

      <ul className="space-y-4">
        {displayedPosts.map((post) => (
          <li
            key={post.id}
            className="p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div onClick={() => setSelectedPost(post)}>
              <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
              <p className="text-gray-600 mt-1 line-clamp-2">{post.body}</p>
            </div>

            <div className="flex mt-2 gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleLike(post.id);
                }}
                className={`px-2 py-1 rounded ${likedPosts.includes(post.id) ? "bg-green-200" : "bg-gray-200"}`}
              >
                👍
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleDislike(post.id);
                }}
                className={`px-2 py-1 rounded ${dislikedPosts.includes(post.id) ? "bg-red-200" : "bg-gray-200"}`}
              >
                👎
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(post.id);
                }}
                className={`px-2 py-1 rounded ${favorites.includes(post.id) ? "bg-yellow-300" : "bg-gray-200"}`}
              >
                ★
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedPost && (
        <ModalPost selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
      )}
    </div>
  );
};

export default PostsList;
