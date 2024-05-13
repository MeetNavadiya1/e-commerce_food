import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminMenu() {
  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo">
        <Link to="/home" className="app-brand-link">
          <span className="app-brand-logo demo">
            {/* Your SVG Code */}
          </span>
          <span className="app-brand-text demo menu-text fw-bolder ms-2">Online Shop</span>
        </Link>
        <Link to="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
          <i className="bx bx-chevron-left bx-sm align-middle" />
        </Link>
      </div>
      <div className="menu-inner-shadow" />
      <ul className="menu-inner py-1">
        <li className="menu-item">
          <Link to="/home" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle" />
            <div data-i18n="Analytics">Home</div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/category" className="menu-link">
            <i className="menu-icon bx bxs-category" />
            <div data-i18n="Analytics">Category</div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/product" className="menu-link">
            <i className="menu-icon bx bxs-gift" />
            <div data-i18n="Analytics">Products</div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/orders" className="menu-link">
            <i className="menu-icon bx bxs-cart-alt" />
            <div data-i18n="Analytics">Orders</div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/users" className="menu-link">
            <i className="menu-icon bx bxs-user" />
            <div data-i18n="Analytics">Users</div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/change-password" className="menu-link">
            <i className="menu-icon bx bxs-category" />
            <div data-i18n="Analytics">Change Password</div>
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/logout" className="menu-link">
            <i className="menu-icon bx bxs-log-out" />
            <div data-i18n="Analytics">Logout</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
