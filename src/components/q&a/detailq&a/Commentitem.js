import { useContext, useEffect, useRef, useState } from "react";
import { userDataStore } from "../../Root";

const CommentItem = ({ onRemove, onEdit, id, content, created_date }) => {
  const new_date = new Date().getTime();
  const localContentInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState(null);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const userData = useContext(userDataStore);

  const handleClickRemove = () => {
    if (window.confirm(`현재 댓글을 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`현재 댓글을 수정하시겠습니까?`)) {
      onEdit(id, localContent, new_date);
      toggleIsEdit();
    }
  };

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
    }
  }, []);
  return (
    <div className="comment">
      <div className="comment-list">
        <span className="author_info">{username}</span>
        <span className="date">
          {new Date(created_date).toLocaleDateString().slice(0, -1)}&nbsp;&nbsp;
          {new Date(created_date).toLocaleTimeString()}
        </span>
        <div className="content">
          {isEdit ? (
            <>
              <button onClick={handleQuitEdit}>취소</button>
              <button onClick={handleEdit}>완료</button>
            </>
          ) : (
            <>
              <button onClick={toggleIsEdit}>수정</button>
              <button onClick={handleClickRemove}>삭제</button>
            </>
          )}
        </div>
      </div>
      <div className="comment-text">
        {isEdit ? (
          <textarea
            ref={localContentInput}
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
    </div>
  );
};
export default CommentItem;
