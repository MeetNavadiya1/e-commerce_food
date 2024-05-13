import getBase from "./api";
import showError from "./toast-message";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import VerifyLogin from "./VerifyLogin";
export default function AdminUsers() {

  let [users, setUser] = useState([]); //create an empty array
  VerifyLogin();
  useEffect(() => {
    if (users.length === 0) {
      let apiAddress = getBase() + "users.php";
      fetch(apiAddress)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //create variable to store error status
          let error = data[0]['error'];
          console.log(error);
          if (error !== 'no')
            showError(error)
          else if (data[1]['total'] === 0) {
            showError('no users available');
          }
          else {
            //delete 2 object from begining
            data.splice(0, 2);
            setUser(data);
          }
        })
        .catch((error)=>{
          showError('networking error!, its seems your internet connection is not working');
        })

    }
  });
  let DisplayUser = function (item) {
    //object destrucring
    let {id,email,mobile} = item;
    return (<tr>
      <td>{id}</td>
      <td>{email}</td>
      <td>{mobile}</td>
      <td>
        <a href="admin-orders.html" title="click to see this users orders"><i className="bx bxs-box bx-lg mb-2" /></a>
      </td>
    </tr>)
  }
  return (<div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      {/* Menu */}
      <AdminMenu />
      <div className="layout-page">

        <div className="content-wrapper">
          {/* Content */}
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-between">
                <h4 className="fw-bold py-1 mb-1" />
                {/* <a href="admin-add-category.html" class="btn btn-primary">Add category</a> */}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <h5 className="card-header">Customers/Users</h5>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th width="10%">Srno</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th width="10%">Orders</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((item) => DisplayUser(item))}  
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Basic Bootstrap Table */}
          </div>
        </div>
      </div>
    </div>
  </div>);
}