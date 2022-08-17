import React from "react";

export default function AdminReadOnlyRow({
  key,
  product,
  handleEditClick,
  handleDeleteClick,
}) {
  return (
    <tr>
      <th>{key + 1}</th>
      <td>{product.name}</td>
      <td>{product.brand}</td>
      <td>{product.description}</td>
      <td>{product.rating}</td>
      <td>{product.price}</td>
      <td>{product.weight}</td>
      <td>{product.measure}</td>
      {product.date ? <td>YES</td> : <td>NO</td>}

      <td>{product.category}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, product)}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={(event) => handleDeleteClick(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
