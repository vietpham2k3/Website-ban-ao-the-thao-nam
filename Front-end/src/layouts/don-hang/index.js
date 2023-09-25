import { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import { fetchAll, searchUser } from 'service/Service';
import Confirm from 'Confirm';
// bosstrap 
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

// @mui material components
import Card from "@mui/material/Card";

// React components
import SoftBox from "components/SoftBox";

//  React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function DonHang() {



  return (
    <DashboardLayout>
      <DashboardNavbar />
      
      <Footer />
    </DashboardLayout>
  );
}

export default DonHang;
