import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import AdminReadOnlyRow from "./AdminReadOnlyRow";
import AdminEditableRow from "./AdminEditableRow";
import AdminNavbar from "./AdminNavbar";
import "./AdminPM.css";
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

  const [alcohol, setAlcohol] = useState([]);
  const [beauty, setBeauty] = useState([]);
  const [beverage, setBeverage] = useState([]);
  const [canned, setCanned] = useState([]);
  const [dairy, setDairy] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [household, setHousehold] = useState([]);
  const [meat, setMeat] = useState([]);
  const [others, setOthers] = useState([]);
  const [pantry, setPantry] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [sweets, setSwets] = useState([]);
  const [vegetables, setVegetables] = useState([]);

  const [editProductId, setEditProductId] = useState(null);
  const [editProductPhoto, setEditProductPhoto] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp = await axios.get("http://localhost:8080/api/product");
        setProducts(resp.data);

        console.log(resp.data);
        const alcoholP = [];
        const beautyP = [];
        const beverageP = [];
        const cannedP = [];
        const dairyP = [];
        const fruitsP = [];
        const householdP = [];
        const meatP = [];
        const othersP = [];
        const pantryP = [];
        const snacksP = [];
        const sweetsP = [];
        const vegetablesP = [];

        for (var i = 0; i < resp.data.length; i++) {
          if (resp.data[i].category === "ALCOHOL") {
            alcoholP.push(resp.data[i]);
          }
          if (resp.data[i].category === "BEAUTY") {
            beautyP.push(resp.data[i]);
          }
          if (resp.data[i].category === "BEVERAGE") {
            beverageP.push(resp.data[i]);
          }
          if (resp.data[i].category === "CANNED") {
            cannedP.push(resp.data[i]);
          }
          if (resp.data[i].category === "DAIRY") {
            dairyP.push(resp.data[i]);
          }
          if (resp.data[i].category === "FRUITS") {
            fruitsP.push(resp.data[i]);
          }
          if (resp.data[i].category === "HOUSEHOLD") {
            householdP.push(resp.data[i]);
          }
          if (resp.data[i].category === "MEAT") {
            meatP.push(resp.data[i]);
          }
          if (resp.data[i].category === "OTHERS") {
            othersP.push(resp.data[i]);
          }
          if (resp.data[i].category === "PANTRY") {
            pantryP.push(resp.data[i]);
          }
          if (resp.data[i].category === "SNACKS") {
            snacksP.push(resp.data[i]);
          }
          if (resp.data[i].category === "SWEETS") {
            sweetsP.push(resp.data[i]);
          }
          if (resp.data[i].category === "VEGETABLES") {
            vegetablesP.push(resp.data[i]);
          }
        }
        setAlcohol(alcoholP);
        setBeauty(beautyP);
        setBeverage(beverageP);
        setCanned(cannedP);
        setDairy(dairyP);
        setFruits(fruitsP);
        setHousehold(householdP);
        setMeat(meatP);
        setOthers(othersP);
        setPantry(pantryP);
        setSnacks(snacksP);
        setSwets(sweets);
        setVegetables(vegetablesP);
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
  if (
    products === null ||
    alcohol === null ||
    beauty === null ||
    beverage === null ||
    canned === null ||
    dairy === null ||
    fruits === null ||
    household === null ||
    meat === null ||
    others === null ||
    pantry === null ||
    snacks === null ||
    sweets === null ||
    vegetables === null
  ) {
    return <div>No products available</div>;
  }
  return (
    <div>
      <AdminNavbar />
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              ALCOHOL
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div class="accordion-body">
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
                    {alcohol.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              BEAUTY
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div class="accordion-body">
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
                    {beauty.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              BEVERAGE
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div class="accordion-body">
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
                    {beverage.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingFour">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseFour"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseFour"
            >
              CANNED
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseFour"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingFour"
          >
            <div class="accordion-body">
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
                    {canned.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingFive">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseFive"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseFive"
            >
              DAIRY
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseFive"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingFive"
          >
            <div class="accordion-body">
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
                    {dairy.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingSix">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseSix"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseSix"
            >
              FRUITS
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseSix"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingSix"
          >
            <div class="accordion-body">
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
                    {fruits.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingSeven">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseSeven"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseSeven"
            >
              HOUSEHOLD
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseSeven"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingSeven"
          >
            <div class="accordion-body">
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
                    {household.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingEight">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseEight"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseEight"
            >
              MEAT
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseEight"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingEight"
          >
            <div class="accordion-body">
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
                    {meat.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingNine">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseNine"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseNine"
            >
              OTHERS
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseNine"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingNine"
          >
            <div class="accordion-body">
              <form onSubmit={handleEditFormSubmit}>
                <table cellspacing="12">
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
                    {others.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingTen">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTen"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTen"
            >
              PANTRY
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTen"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTen"
          >
            <div class="accordion-body">
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
                    {pantry.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingEleven">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseEleven"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseEleven"
            >
              SNACKS
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseEleven"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingEleven"
          >
            <div class="accordion-body">
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
                    {snacks.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-heading12">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapse12"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapse12"
            >
              SWEETS
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapse12"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-heading12"
          >
            <div class="accordion-body">
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
                    {sweets.map((product, key) => (
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
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-heading13">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapse13"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapse13"
            >
              VEGETABLES
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapse13"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-heading13"
          >
            <div class="accordion-body">
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
                    {vegetables.map((product, key) => (
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
            </div>
          </div>
        </div>
      </div>
      <div className="app-container">
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
