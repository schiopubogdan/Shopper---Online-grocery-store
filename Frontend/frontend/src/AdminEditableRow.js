import React from "react";

export default function AdminEditableRow({
  key,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) {
  return (
    <tr>
      <th>{key + 1}</th>
      <td>
        <input
          type="text"
          required
          placeholder="Name"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Brand"
          name="brand"
          value={editFormData.brand}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Description"
          name="description"
          value={editFormData.description}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Rating"
          name="rating"
          value={editFormData.rating}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Price"
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Weight"
          name="weight"
          value={editFormData.weight}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <select
          placeholder="Measure"
          name="measure"
          className="form-select"
          required
          onChange={handleEditFormChange}
          value={editFormData.measure}
        >
          <option selected disabled value="">
            Choose...
          </option>
          <option>G</option>
          <option>KG</option>
          <option>ML</option>
          <option>L</option>
          <option>PACKAGE</option>
        </select>
      </td>
      <td>
        {" "}
        <select
          className="form-select"
          placeholder="Exp date"
          name="date"
          required
          onChange={handleEditFormChange}
          value={editFormData.date}
        >
          <option selected disabled value="">
            Choose...
          </option>
          <option>true</option>
          <option>false</option>
        </select>
      </td>

      <td>
        <select
          className="form-select"
          placeholder="Category"
          name="category"
          value={editFormData.category}
          required
          onChange={handleEditFormChange}
        >
          <option selected disabled value="">
            Choose...
          </option>
          <option>ALCOHOL</option>
          <option>BEAUTY</option>
          <option>BEVERAGE</option>
          <option>CANNED</option>
          <option>DAIRY</option>
          <option>FRUITS</option>
          <option>HOUSEHOLD</option>
          <option>MEAT</option>
          <option>OTHERS</option>
          <option>PANTRY</option>
          <option>SNACKS</option>
          <option>SWEETS</option>
          <option>VEGETABLES</option>
        </select>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
}
