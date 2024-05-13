import AdminMenu from "./AdminMenu";
import axios from 'axios'
import { useEffect, useState } from "react";
import getBase from "./api";
import showError from "./toast-message";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import VerifyLogin from "./VerifyLogin";
export default function AdminOrdersDetail() {
  VerifyLogin();
  //create state object
  let [data, setData] = useState({});
  //fetch parameter passed in url http://localhost:3000/orders-detail/15
  var { orderid } = useParams(); //object destructring
  console.log(orderid);
  useEffect(()=>{
      var apiAddress = getBase() + "orders.php?id=" + orderid;
      axios({
        url:apiAddress,
        method:'get',
        responseType:'json'
      }).then((response) => {
          console.log(response);
          if(response.status !== 200)
          {
            showError('oops, something went wrong, contact administrator');
          }
          else if(response.data[0]['error'] !='no')
          {
            showError(response.data[0]['error']);
          }
          else if(response.data[1]['total'] == 0)
          {
            showError('no order found');
          }
          else 
          {
              setData(response.data[2]);
          }
      })
  });
  let DisplayStatus = function(orderstatus)
  {
      if(orderstatus === '1')
        return "Confirmed";
      else if(orderstatus === '2')
        return "Dispatched";
      else if(orderstatus === '3')
        return "Delivered";
      else if(orderstatus === '4')
        return "Canceled";
  }
  return (<div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      {/* Menu */}
      <AdminMenu />
      <div className="layout-page">

        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-between">
                <h4 className="fw-bold py-1 mb-1" />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <h5>Orders Detail</h5>
                    <a href="admin-order-print.html" className="btn btn-success text-white">Print</a>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped table-sm">
                        <tbody>
                          <tr>
                            <td>ID</td>
                            <td>{data.id}</td>
                            <td>Customer ID</td>
                            <td>10101</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td>{data.billdate}</td>
                            <td>Name</td>
                            <td>Ankit Patel</td>
                          </tr>
                          <tr>
                            <td>Amount</td>
                            <td>{data.amount}</td>
                            <td>Address</td>
                            <td>{data.address1} <br />
                              {data.address2}</td>
                          </tr>
                          <tr className="align-text-top">
                            <td>Status <br />
                              <select className="form-select" required>
                                <option value>select status</option>
                                <option value={1}>Confirmed</option>
                                <option value={2}>Dispatched</option>
                                <option value={3}>Delivered</option>
                                <option value={4}>Canceled</option>
                              </select>
                              <br />
                              <input type="submit" className="btn btn-danger w-100" defaultValue="Change order status" />
                            </td>
                            <td>{DisplayStatus(data.orderstatus)}</td>
                            <td>City</td>
                            <td>{data.city} - {data.pincode}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="table-responsive">
                      <tfooter>
                      </tfooter><table className="table table-bordered table-striped table-sm mt-3">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>I Phone</td>
                            <td>
                              <img src="https://picsum.photos/100" className="img-fluid" />
                            </td>
                            <td className="text-end">125000</td>
                            <td className="text-end">2</td>
                            <td className="text-end">250000</td>
                          </tr>
                        </tbody>
                        <tbody><tr>
                          <th>Grand total</th>
                          <th colSpan={5} className="text-end">250000</th>
                        </tr>
                        </tbody></table>
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