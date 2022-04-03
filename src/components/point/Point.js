import React from "react";

import { Link } from "react-router-dom";
import { numberComma } from "../../util/NumberComma";
const Point = ({ onPointClick, pointItem, currentPage, searchedItems }) => {
  return (
    <tbody key={[pointItem.id]}>
      <tr
        onClick={() => {
          onPointClick(pointItem);
        }}
      >
        <td>{pointItem.id}</td>
        <td>
          <Link
            to={{
              pathname: `/point/view/${pointItem.id}`,
              state: {
                currentPage: currentPage,
                searchedItems: searchedItems,
              },
            }}
          >
            {pointItem.companyName ? pointItem.companyName : "개인"}
          </Link>
        </td>
        <td>{pointItem.phone}</td>
        <td>{pointItem.email}</td>
        <td>{numberComma(pointItem.pointAmount)}</td>
        <td>{pointItem.division}</td>
        <td>{pointItem.applyDate}</td>
        <td>{pointItem.modifiedDate}</td>
        <td>{pointItem.status}</td>
        <td>{pointItem.modifiedBy}</td>
      </tr>
    </tbody>
  );
};

export default Point;
