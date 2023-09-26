
import { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";

// bosstrap 
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


//  React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function DonHang() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <h1>Table with Backend Data</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    <Footer />
    </DashboardLayout>
  );
  
}
export default DonHang;
