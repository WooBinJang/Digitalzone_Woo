import CommentItem from "./Commentitem";

const CommentList = ({ onEdit, onRemove, CommentList }) => {
  return (
    <div className="CommentList">
      <div>
        {CommentList.map((it) => (
          <CommentItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

CommentList.defaultProps = {
  CommentList: []
};

export default CommentList;
