import { ToastContainer } from "react-toastify";
import AdminMenu from "./AdminMenu";
import VerifyLogin from "./VerifyLogin";
import { useEffect, useState } from "react";
import getBase from "./api";
import showError, { showMessage } from "./toast-message";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AdminAddProduct() {
  VerifyLogin();
  let navigate = useNavigate();
  // Create state variables
  var [name, setName] = useState("");
  var [price, setPrice] = useState("");
  var [file, setFile] = useState(null);
  var [stock, setStock] = useState("");
  var [size, setSize] = useState("");
  var [weight, setWeight] = useState("");
  var [comments, setComments] = useState("");
  var [selectedCategory, setSelectedCategory] = useState("");
  var [isLive, setIsLive] = useState("");
  let resetForm = function () {
    //reset name to ''
    setName('');
    setWeight('');
    setPrice('');
    setWeight('');
    setSize('');
    setComments('');
    setStock('');
  }
  // Event handlers for each input field
  const handleNameChange = (event) => setName(event.target.value);
  const handlePriceChange = (event) => setPrice(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);
  const handleStockChange = (event) => setStock(event.target.value);
  const handleSizeChange = (event) => setSize(event.target.value);
  const handleWeightChange = (event) => setWeight(event.target.value);
  const handleCommentsChange = (event) => setComments(event.target.value);
  const handleCategoryChange = (event) => setSelectedCategory(event.target.value);
  const handleIsLiveChange = (event) => setIsLive(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the state variables (name, price, file, etc.) here and perform actions accordingly
    // For example, you can console.log or make an API call
    console.log({
      name,
      price,
      file,
      stock,
      size,
      weight,
      comments,
      selectedCategory,
      isLive,
    });
    var form = new FormData();

    // Append state variables to the form object
    form.append("name", name);
    form.append("photo", file);
    form.append("price", price);
    form.append("stock", stock);
    // form.append("size", size);
    // form.append("weight", weight);
    form.append("detail", comments);
    form.append("categoryid", selectedCategory);
    // form.append("isLive", isLive);
    //name,photo,price,stock,detail,categoryid
    let apiAddress = getBase() + "insert_product.php";
    axios({
      method: 'post',
      responseType: 'json',
      url: apiAddress,
      data: form
    }).then((response) => {
      console.log(response);
      let error = response.data[0]['error'];
      if (error !== 'no') {
        showError(error);
      }
      else {
        let success = response.data[1]['success'];
        let message = response.data[2]['message'];
        if (success == 'no') {
          showError(message);
        }
        else {
          showMessage(message);
          setTimeout(() => {
            //below code will execute after 2 second interval
            navigate("/product");
          }, 2000);
        }
      }
    });

  };
  let [categories, setCategory] = useState([]);

  useEffect(() => {
    //fetch category id & title 
    if (categories.length === 0) {
      let apiAddress = getBase() + 'category.php';
      //call api 
      fetch(apiAddress)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          //get 1st object's key error
          let error = data[0]['error'];
          console.log(error);
          if (error !== 'no')
            alert(error);
          else {
            //get 2nd object's key total
            let total = data[1]['total']
            if (total === 0) {
              alert('no category available');
            }
            else {
              //delete 2 object from begining
              data.splice(0, 2);
              //store data into state
              setCategory(data);
              // console.log(categories);
            }
          }
        })
        .catch(error => {
          console.log(error);
          showError('networking error!, its seems your internet connection is not working');
        });
    }
  })
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <AdminMenu />
        <ToastContainer />
        <div className="layout-page">
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row mb-3">
                <div className="col-12 d-flex justify-content-between">
                  <h4 className="fw-bold py-1 mb-1">Products</h4>
                  <a href="admin-product.html" className="btn btn-primary">
                    back
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <h5 className="card-header">Add new product</h5>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-4 pt-2">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="name"
                                value={name}
                                onChange={(handleNameChange)}
                              />
                              <label htmlFor="name">Name</label>
                            </div>
                          </div>
                          <div className="col-lg-4 pt-2">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="price"
                                placeholder="price"
                                value={price}
                                onChange={handlePriceChange}
                              />
                              <label htmlFor="price">Price</label>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label htmlFor="formFile" className="form-label">
                              Select photo
                            </label>
                            <input
                              className="form-control"
                              accept="image/*"
                              type="file"
                              id="formFile"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="stock"
                                placeholder="available quantity for sell"
                                value={stock}
                                onChange={handleStockChange}
                              />
                              <label htmlFor="stock">Stock</label>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="size"
                                placeholder="Product Size"
                                value={size}
                                onChange={handleSizeChange}
                              />
                              <label htmlFor="size">Size</label>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="weight"
                                placeholder="Weight"
                                value={weight}
                                onChange={handleWeightChange}
                              />
                              <label htmlFor="weight">Weight</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <select
                              name="categoryid" value={selectedCategory}
                              onChange={handleCategoryChange}
                              className="form-select" aria-label="Default select">
                              <option selected>Select Category</option>
                              {categories.map((item) => {
                                return <option value={item.id}>{item.title}</option>
                              })}
                            </select>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="comments"
                                style={{ height: "100px" }}
                                value={comments}
                                onChange={handleCommentsChange}
                              />
                              <label htmlFor="comments">Comments</label>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <label className="form-label">Is Live</label>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="isLive"
                                id="yes"
                                value="yes"
                                checked={isLive === "yes"}
                                onChange={handleIsLiveChange}
                              />
                              <label className="form-check-label" htmlFor="yes">
                                Yes
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="isLive"
                                id="no"
                                value="no"
                                checked={isLive === "no"}
                                onChange={handleIsLiveChange}
                              />
                              <label className="form-check-label" htmlFor="no">
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 text-end">
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              Save changes
                            </button>
                            <button
                              onClick={resetForm}
                              type="reset"
                              className="btn btn-secondary"
                            >
                              Clear all
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
