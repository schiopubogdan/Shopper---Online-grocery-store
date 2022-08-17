import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import AdminReadOnlyRow from "./AdminReadOnlyRow";
import AdminEditableRow from "./AdminEditableRow";
import AdminNavbar from "./AdminNavbar";
export default function AdminProductManagement() {
  const [editFormData, setEditFormData] = useState({
    name: "",
    brand: "",
    description: "",
    rating: "",
    price: "",
    weight: "",
    category: "",
    measure: "",
    date: "",
  });
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
  const [products, setProducts] = useState(null);

  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [description, setDescription] = useState();
  const [rating, setRating] = useState();
  const [price, setPrice] = useState();
  const [weight, setWeight] = useState();
  const [category, setCategory] = useState();
  const [measure, setMeasure] = useState();
  const [date, setDate] = useState();
  const [photoURL, setPhotoURL] = useState();

  const [editProductId, setEditProductId] = useState(null);
  const [editProductPhoto, setEditProductPhoto] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await axios.get("http://localhost:8080/api/product");
        setProducts(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  function addProduct() {
    var isTrue = date === "true";
    let dto = {
      id: null,
      name: name,
      brand: brand,
      description: description,
      rating: parseFloat(rating),
      price: parseFloat(price),
      weight: parseFloat(weight),
      hasExpirationDate: isTrue,
      category: category,
      measure: measure,
      photoURL: photoURL,
    };
    axios
      .post("http://localhost:8080/api/product", dto)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          console.log("Product added");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Product was successfully added.");
  }

  const handleEditClick = (event, product) => {
    event.preventDefault();
    setEditProductId(product.id);
    setEditProductPhoto(product.photoURL);
    const formValues = {
      name: product.name,
      brand: product.brand,
      description: product.description,
      rating: product.rating,
      price: product.price,
      weight: product.weight,
      category: product.category,
      measure: product.measure,
      date: product.hasExpirationDate,
    };
    setEditFormData(formValues);
  };
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    var isTrue = editFormData.date === "true";
    let dto = {
      id: editProductId,
      name: editFormData.name,
      brand: editFormData.brand,
      description: editFormData.description,
      rating: parseFloat(editFormData.rating),
      price: parseFloat(editFormData.price),
      weight: parseFloat(editFormData.weight),
      hasExpirationDate: isTrue,
      category: editFormData.category,
      measure: editFormData.measure,
      photoURL: editProductPhoto,
    };
    axios
      .put("http://localhost:8080/api/product", dto)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          console.log("Product updated");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Product was successfully updated.");
    setEditProductId(null);
  };
  const handleCancelClick = () => {
    setEditProductId(null);
  };
  const handleDeleteClick = (productId) => {
    axios
      .delete(`http://localhost:8080/api/product?id=${productId}`)
      .then((res) => {
        if (res.data === "") {
          console.log("X");
        } else {
          console.log("Product deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    alert("Product was successfully deleted.");
    window.location.reload();
  };
  if (products === null) {
    return <div>No products available</div>;
  }
  return (
    <div>
      <AdminNavbar />
      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>BRAND</th>
                <th>DESCRIPTION</th>
                <th>RATING</th>
                <th>PRICE</th>
                <th>WEIGHT</th>
                <th>MEASURE</th>
                <th>EXP DATE</th>
                <th>CATEGORY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, key) => (
                <Fragment>
                  {editProductId === product.id ? (
                    <AdminEditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <AdminReadOnlyRow
                      handleDeleteClick={handleDeleteClick}
                      product={product}
                      key={key}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
        <br></br>
        <h2>Add a product</h2>

        <form className="row g-3">
          <div className="col-md-3">
            <label for="validationDefault01" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault01"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label for="validationDefault02" className="form-label">
              Brand
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault02"
              required
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label for="validationDefault03" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault03"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label for="validationDefault04" className="form-label">
              Rating
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault04"
              required
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label for="validationDefault05" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault05"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label for="validationDefault06" className="form-label">
              Expiration date
            </label>
            <select
              className="form-select"
              id="validationDefault06"
              required
              onChange={(e) => setDate(e.target.value)}
            >
              <option selected disabled value="">
                Choose...
              </option>
              <option>true</option>
              <option>false</option>
            </select>
          </div>
          <div className="col-md-3">
            <label for="validationDefault07" className="form-label">
              Weight
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault07"
              required
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label for="validationDefault08" className="form-label">
              Measure
            </label>
            <select
              className="form-select"
              id="validationDefault08"
              required
              onChange={(e) => setMeasure(e.target.value)}
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
          </div>
          <div className="col-md-3">
            <label for="validationDefault09" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="validationDefault09"
              required
              onChange={(e) => setCategory(e.target.value)}
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
          </div>
          <div className="col-md-6">
            <label for="validationDefault10" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="validationDefault10"
              required
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" onClick={addProduct}>
              Add product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
