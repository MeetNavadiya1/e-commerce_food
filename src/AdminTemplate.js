import AdminMenu from "./AdminMenu";
export default function AdminTemplate() {
    return(<div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
    <AdminMenu />
      <div className="layout-page">
        
        <div className="content-wrapper">
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
                  <h5 className="card-header" />
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