import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdOutlineCreateNewFolder, MdDashboard } from "react-icons/md";
import Dashboard from "../components/dashboard/Dashboard";
import CreateProduct from "../components/addProducts/CreateProduct";
import EditProduct from "../components/dashboard/products/EditProduct";
const Admin = () => {
  const navigate = useNavigate();
  const handleDelete = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };
  return (
    <>
      <Routes>
        <Route path="createProduct" element={<CreateProduct />} />
        <Route path="editProduct/:id" element={<EditProduct />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <aside className="sidebar">
        <h1>Admin Dashboard</h1>
        <ul>
          <NavLink to="/admin/dashboard">
            <li>
              <MdDashboard className="icon" />
              Dashboard
            </li>
          </NavLink>
          <NavLink to="/admin/createProduct">
            <li>
              <MdOutlineCreateNewFolder className="icon" />
              Create Products
            </li>
          </NavLink>
        </ul>

        <button onClick={handleDelete} aria-label="Log Out">
          <CiLogout className="icon" />
          <p>Log Out</p>
        </button>
      </aside>
    </>
  );
};

export default Admin;
