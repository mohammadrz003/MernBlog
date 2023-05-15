import React from "react";
import { FiEdit2, FiMessageSquare, FiTrash } from "react-icons/fi";

import Images from "../../constants/images";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
    updateComment,
    deleteComment,
  replies
}) => {
  const isUserLoggined = Boolean(logginedUserId);
  const commentBeLongsToUser = logginedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2FAF5] p-3 rounded-lg">
      <img
        src={Images.PostProfileImage}
        alt="user profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light">
            {comment.desc}
          </p>
        )}

        {isEditing && (
          <CommentForm
            btnLabel="Update"
                      formSubmitHandler={(value) => updateComment(value, comment._id)}
                      formCancelHandler={() => setAffectedComment(null)}
                      initialText = {comment.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-3 mb-3">
          {isUserLoggined && (
            <button
              className="flex items-center space-x-2"
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <span>Reply</span>
              <FiMessageSquare className="w-4 h-aut0" />
            </button>
          )}
          {commentBeLongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <span>Edit</span>
                <FiEdit2 className="w-4 h-aut0" />
              </button>

              <button className="flex items-center space-x-2" onClick={() => deleteComment(comment._id)}>
                <span>Delete</span>
                <FiTrash className="w-4 h-aut0" />
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
              )}
              {
                  replies.length > 0 && (
                      <div>
                          {
                              replies.map((reply) => (
                                  <Comment key={reply._id} addComment={addComment} affectedComment={affectedComment} setAffectedComment={setAffectedComment} deleteComment={deleteComment} comment={reply} logginedUserId={logginedUserId} replies={[]} updateComment={updateComment} parentId={comment._id}/>
                              ))
                          }
                      </div>
                  )
              }
      </div>
    </div>
  );
};

export default Comment;
