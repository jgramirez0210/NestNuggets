import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext.js';
import {
  createComment,
  getCommentsByReview,
  updateComment,
  deleteComment,
  addCommentLike,
  removeCommentLike,
  addCommentDislike,
  removeCommentDislike,
  getCommentLikes,
  getCommentDislikes,
  checkUserCommentLike,
  checkUserCommentDislike,
} from '../api/commentData.js';

export default function CommentsSection({ reviewId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [userDislikes, setUserDislikes] = useState({});

  useEffect(() => {
    fetchComments();
  }, [reviewId]);

  const fetchComments = async () => {
    try {
      const fetchedComments = await getCommentsByReview(reviewId);
      const sortedComments = (fetchedComments || []).sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sortedComments);

      if (user?.uid) {
        fetchLikesAndDislikes(sortedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchLikesAndDislikes = async (commentsList) => {
    const likesData = {};
    const dislikesData = {};
    const userLikesData = {};
    const userDislikesData = {};

    for (const comment of commentsList) {
      likesData[comment.firebaseKey] = await getCommentLikes(comment.firebaseKey);
      dislikesData[comment.firebaseKey] = await getCommentDislikes(comment.firebaseKey);
      userLikesData[comment.firebaseKey] = await checkUserCommentLike(comment.firebaseKey, user.uid);
      userDislikesData[comment.firebaseKey] = await checkUserCommentDislike(comment.firebaseKey, user.uid);
    }

    setLikes(likesData);
    setDislikes(dislikesData);
    setUserLikes(userLikesData);
    setUserDislikes(userDislikesData);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setLoading(true);
    try {
      const payload = {
        reviewId,
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        content: newComment,
        parentCommentId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await createComment(payload);
      setNewComment('');
      setCharCount(0);
      await fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e, parentCommentId) => {
    e.preventDefault();
    if (!replyContent.trim() || !user) return;

    setLoading(true);
    try {
      const payload = {
        reviewId,
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        content: replyContent,
        parentCommentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await createComment(payload);
      setReplyContent('');
      setReplyingTo(null);
      await fetchComments();
    } catch (error) {
      console.error('Error creating reply:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = async (firebaseKey, currentContent) => {
    if (editingId !== firebaseKey) {
      setEditingId(firebaseKey);
      setEditContent(currentContent);
    } else {
      if (!editContent.trim()) return;

      setLoading(true);
      try {
        await updateComment(firebaseKey, {
          content: editContent,
          updatedAt: new Date().toISOString(),
        });
        setEditingId(null);
        setEditContent('');
        await fetchComments();
      } catch (error) {
        console.error('Error updating comment:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteComment = async (firebaseKey) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    setLoading(true);
    try {
      await deleteComment(firebaseKey);
      await fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (firebaseKey) => {
    if (!user) return;

    try {
      if (userLikes[firebaseKey]) {
        await removeCommentLike(firebaseKey, user.uid);
      } else {
        if (userDislikes[firebaseKey]) {
          await removeCommentDislike(firebaseKey, user.uid);
        }
        await addCommentLike(firebaseKey, user.uid);
      }
      await fetchLikesAndDislikes(comments);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDislike = async (firebaseKey) => {
    if (!user) return;

    try {
      if (userDislikes[firebaseKey]) {
        await removeCommentDislike(firebaseKey, user.uid);
      } else {
        if (userLikes[firebaseKey]) {
          await removeCommentLike(firebaseKey, user.uid);
        }
        await addCommentDislike(firebaseKey, user.uid);
      }
      await fetchLikesAndDislikes(comments);
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const topLevelComments = comments.filter(c => !c.parentCommentId);
  const getReplies = (commentId) => comments.filter(c => c.parentCommentId === commentId);

  const CommentItem = ({ comment, isReply = false }) => (
    <div
      className="bg-light p-3 rounded-lg mb-3"
      style={{ marginLeft: isReply ? '2rem' : '0' }}
    >
      <div className="d-flex align-items-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={comment.userPhoto || 'https://via.placeholder.com/40'}
          alt={comment.userName}
          className="rounded-circle me-3"
          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="mb-1">
                <strong className="text-primary">{comment.userName}</strong>
              </p>
              <small className="text-secondary">
                {formatDate(comment.createdAt)}
                {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                  <span> (edited {formatDate(comment.updatedAt)})</span>
                )}
              </small>
            </div>
            {user?.uid === comment.userId && (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-link text-primary p-0"
                  onClick={() => handleEditComment(comment.firebaseKey, comment.content)}
                  disabled={loading}
                >
                  {editingId === comment.firebaseKey ? 'Save' : 'Edit'}
                </button>
                <button
                  className="btn btn-sm btn-link text-danger p-0"
                  onClick={() => handleDeleteComment(comment.firebaseKey)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {editingId === comment.firebaseKey ? (
            <textarea
              className="form-control mt-2 mb-2"
              value={editContent}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  setEditContent(e.target.value);
                }
              }}
              maxLength="300"
              rows="2"
            />
          ) : (
            <p className="mt-2 mb-3 text-dark">{comment.content}</p>
          )}

          <div className="d-flex gap-3 align-items-center mb-2">
            <button
              className={`btn btn-sm p-0 ${userLikes[comment.firebaseKey] ? 'text-primary' : 'text-secondary'}`}
              onClick={() => handleLike(comment.firebaseKey)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              👍 {likes[comment.firebaseKey] || 0}
            </button>
            <button
              className={`btn btn-sm p-0 ${userDislikes[comment.firebaseKey] ? 'text-danger' : 'text-secondary'}`}
              onClick={() => handleDislike(comment.firebaseKey)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              👎 {dislikes[comment.firebaseKey] || 0}
            </button>
            {!isReply && (
              <button
                className="btn btn-sm btn-link p-0 text-primary"
                onClick={() => setReplyingTo(comment.firebaseKey)}
              >
                Reply
              </button>
            )}
          </div>

          {replyingTo === comment.firebaseKey && (
            <form onSubmit={(e) => handleReply(e, comment.firebaseKey)} className="mt-3">
              <textarea
                className="form-control mb-2"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                maxLength="300"
                rows="2"
              />
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-sm btn-primary"
                  disabled={loading || !replyContent.trim()}
                >
                  {loading ? 'Posting...' : 'Reply'}
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent('');
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {getReplies(comment.firebaseKey).length > 0 && (
        <React.Fragment key={`replies-${comment.firebaseKey}`}>
          {getReplies(comment.firebaseKey).map(reply => (
            <React.Fragment key={reply.firebaseKey}>
              <CommentItem comment={reply} isReply />
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </div>
  );

  return (
    <div className="mt-5">
      <h3 className="text-primary mb-4">Discussion ({comments.length})</h3>

      {user ? (
        <form onSubmit={handleAddComment} className="mb-5">
          <div className="form-group mb-2">
            <textarea
              className="form-control"
              value={newComment}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  setNewComment(e.target.value);
                  setCharCount(e.target.value.length);
                }
              }}
              placeholder="Share your thoughts about this property..."
              maxLength="300"
              rows="3"
            />
            <small className="text-secondary">
              {charCount}/300 characters
            </small>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !newComment.trim()}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="alert alert-info mb-4">
          Sign in to participate in the discussion.
        </div>
      )}

      <div>
        {topLevelComments.length > 0 ? (
          topLevelComments.map(comment => (
            <React.Fragment key={comment.firebaseKey}>
              <CommentItem comment={comment} />
            </React.Fragment>
          ))
        ) : (
          <p className="text-secondary">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
