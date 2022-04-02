import React from "react";
import { Link } from "react-router-dom";

const Approve = ({ post, currentPage, searchedItems }) => {
  return (
    <tbody>
      <tr>
        <td>{post.num}</td>
        <td>
          <Link
            to={{
              pathname: `/approve/view/${post.num}`,
              state: {
                currentPage: currentPage,
                searchedItems: searchedItems,
              },
            }}
          >
            {post.surveyName}
          </Link>
        </td>
        <td>{post.date}</td>

        <td>{post.needSample}</td>
        <td>{post.completeSample}</td>
        <td>{post.state}</td>
        <td>{post.modifiedDate}</td>
        <td>{post.modifiedBy}</td>
        <td>{post.affiliation}</td>
      </tr>
    </tbody>
  );
};

export default Approve;
