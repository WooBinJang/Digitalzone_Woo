import { useRef, useState } from "react";

const CommentEditor = ({ onCreate }) => {
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content);
    alert("댓글이 저장되었습니다.");
    setState({
      author: "",
      content: "",
    });
  };

  return (
    <div className="comment-input">
      <p>댓글입력</p>
      <div>
        <input
          value={state.content}
          onChange={handleChangeState}
          name="content"
          type="text"
        />
      </div>
      <div>
        <button onClick={handleSubmit}>확인</button>
      </div>
    </div>
  );
};
export default CommentEditor;
