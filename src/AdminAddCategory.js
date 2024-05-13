import AdminMenu from "./AdminMenu";
import VerifyLogin from "./VerifyLogin";
import { useState } from "react";
import showError, { showMessage } from "./toast-message";
import getBase from "./api";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminAddCategory() {
    let navigate = useNavigate();
    VerifyLogin();
    //create 3 state variable one for each input
    let [title, setTitle] = useState();
    let [photo, setPhoto] = useState();
    let [islive, setIsLive] = useState();
    let AddCategory = function (event) {
        event.preventDefault(); //required to stop submitting form & refreshing web page
        // console.log(title,photo,islive);
        // api call
        let apiAddress = getBase() + "insert_category.php";
        let form = new FormData();
        form.append("title", title);
        form.append("photo", photo);
        form.append("islive", islive);
        // console.log(form);
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
            else 
            {
                let success = response.data[1]['success'];
                let message = response.data[2]['message'];
                if (success == 'no') {
                    showError(message);
                }
                else {
                    showMessage(message);
                    setTimeout(()=>{
                        //below code will execute after 2 second interval
                        navigate("/category");
                    },2000);
                }
            }
        })
    }
    return (<div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
            <AdminMenu />
            <div className="layout-page">
                <div className="content-wrapper">
                    {/* Content */}
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <ToastContainer />
                        <div className="row mb-3">
                            <div className="col-12 d-flex justify-content-between">
                                <h4 className="fw-bold py-1 mb-1">Category</h4>
                                <a href="admin-category.html" className="btn btn-primary">back</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <h5 className="card-header">Add new category</h5>
                                    <div className="card-body">
                                        <form onSubmit={AddCategory} encType="multipart/form-data" method="post" >
                                            <div className="mb-3">
                                                <label htmlFor="inputTitle" className="form-label">Title</label>
                                                <input type="text" className="form-control" id="inputTitle" required
                                                    value={title} onChange={(event) => setTitle(event.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputPhoto" className="form-label">Photo</label>
                                                <input type="file" className="form-control" id="inputPhoto" required
                                                    onChange={(event) => setPhoto(event.target.files[0])} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Is Live</label>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="isLive" id="yes" value="1" required
                                                        onChange={(event) => setIsLive(event.target.value)} />
                                                    <label className="form-check-label" htmlFor="yes">
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="isLive" id="no" value="0" required
                                                        onChange={(event) => setIsLive(event.target.value)} />
                                                    <label className="form-check-label" htmlFor="no">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <button type="submit" className="btn btn-primary">Save changes</button>
                                                <button type="reset" className="btn btn-secondary">Clear all</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Basic Bootstrap Table */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}