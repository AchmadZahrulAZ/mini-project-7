import React, { useState, useEffect } from 'react'; // Import useState for local state management
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import CreateProduct from '../components/CreateProduct';
import EditProduct from '../components/EditProduct';
import LogsList from '../components/LogsList';
import ProductList from '../components/ProductList';
import StockIn from '../components/StockIn';
import StockOut from '../components/StockOut';


const Dashboard = () => {

  return (
    <Router>
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <Sidebar />
        <div className="w-full lg:w-4/5 px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createproduct" element={<CreateProduct />} />
            <Route path="/editproduct" element={<EditProduct />} />
            <Route path="/logslist" element={<LogsList />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/stockin" element={<StockIn />} />
            <Route path="/stockout" element={<StockOut/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
