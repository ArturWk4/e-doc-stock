import React, { useEffect, useState } from "react";
import { postApi } from "../api/post";
import { PostType } from "../types/posts";
import { CommentType } from "../types/comment";


const ModalPost = ({
  selectedPost,
  setSelectedPost
 }: {
  selectedPost: PostType | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostType | null>>;
}) => {
    const [loadingComments, setLoadingComments] = useState(false);
    
      const [comments, setComments] = useState<CommentType[]>([]);
      
    
  
    const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentBody, setCommentBody] = useState("");

    useEffect(() => {
    if (selectedPost) {
      setLoadingComments(true);
      postApi.getCommentsByPostId(selectedPost.id).then((data) => {
        setComments(data);
        setLoadingComments(false);
      });
    }
  }, [selectedPost]);
    const handleAddComment = () => {
      if (!commentName.trim() || !commentEmail.trim() || !commentBody.trim())
        return;
  
      const newComment: CommentType = {
        postId: selectedPost?.id || 0,
        id: Date.now(),
        name: commentName,
        email: commentEmail,
        body: commentBody,
      };
  
      setComments([newComment, ...comments]);
      setCommentName("");
      setCommentEmail("");
      setCommentBody("");
    };
  return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => {
                setSelectedPost(null);
                setComments([]);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedPost?.title}</h3>
            <p className="text-gray-700 mb-6">{selectedPost?.body}</p>

            <h4 className="text-lg font-semibold mb-2">Комментарии</h4>

            <div className="mb-4 p-3 bg-gray-50 rounded shadow-sm">
              <input
                type="text"
                placeholder="Ваше имя"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Ваш email"
                value={commentEmail}
                onChange={(e) => setCommentEmail(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <textarea
                placeholder="Комментарий"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
                rows={2}
              />
              <button
                onClick={handleAddComment}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Добавить комментарий
              </button>
            </div>

            {loadingComments ? (
              <p className="text-gray-500">Загрузка комментариев...</p>
            ) : comments.length > 0 ? (
              <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="border border-gray-200 rounded p-3 shadow-sm"
                  >
                    <p className="font-medium text-gray-800">
                      {comment.name}{" "}
                      <span className="text-sm text-gray-500">
                        ({comment.email})
                      </span>
                    </p>
                    <p className="text-gray-600 mt-1">{comment.body}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Комментариев нет</p>
            )}
          </div>
        </div>
  
}


export default ModalPost;