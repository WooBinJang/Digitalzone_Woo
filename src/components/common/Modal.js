import React from "react";
import SurveyRegist from "../survey/SurveyRegist";
import SurveySendModal from "../survey/SurveySendModal";
import "./Modal.css";

const Modal = ({
  setPoint,
  point,
  modalClose,
  post,
  posts,
  setPosts,
  component,
}) => {
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  return (
    <div className="common-Modal-container" onClick={onCloseModal}>
      <div className="common-Modal-modal">
        {component === "SurveySendModal" ? (
          <SurveySendModal
            post={post}
            modalClose={modalClose}
            setPosts={setPosts}
            posts={posts}
            point={point}
            setPoint={setPoint}
          />
        ) : null}
        {component === "SurveyRegist" ? (
          <SurveyRegist
            modalClose={modalClose}
            posts={posts}
            setPosts={setPosts}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Modal;
