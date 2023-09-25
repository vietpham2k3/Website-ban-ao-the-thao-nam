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

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0)
  const [isShow, setIsShow] = useState(false)
  const [key, setKey] = useState("")
  const [dataDelete, setDataDelete] = useState({})
  
  useEffect(() => {
    getAll(0);
  }, []);

  const handleClose = () => {
    setIsShow(false)
  }

  const getAll = async (page) => {
    const res = await fetchAll(page)
    if (res && res.data) {
      setData(res.data.content)
      setTotalPages(res.data.totalPages)
    }
  }

  const search = async (page, key) => {
    const res = await searchUser(key, page)
    if (res && res.data) {
      setData(res.data.content)
      setTotalPages(res.data.totalPages)
    }
  }

  const handlePageClick = (event) => {
    getAll(+event.selected)
  }

  const handleDelete = (id) => {
    setIsShow(true)
    setDataDelete(id);
  };

  // const handleSearchUsers = _.debounce(async (e) => {
  //   let term = e.target.value;
  //   setKey(term); // Lưu từ khóa tìm kiếm vào state key
  //   if (term) {
  //     search(0, term); // Gọi hàm search từ service
  //   } else {
  //     getAll(0);
  //   }
  // }, 100);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>

        <Card >
        
          <div className="w-auto rounded bg-white border shadow p-4">
            <div className="search">
              {/* <input
                type="text"
                className="input-search"
                placeholder="Search..."
                onChange={handleSearchUsers}
              /> */}
              <Link to="/create" className="btn btn-success">
                Add +
              </Link>
            </div>
            <table className="table table-striped">
              <tr>
                <th>#</th>
                <th>Mã</th>
                <th>Tên</th>
                <th>SDT</th>
                <th>Dia chi</th>
                <th>gioiTinh</th>
                <th>trangthai</th>
                <th>chucvu</th>
                <th>Action</th>
              </tr>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.ma}</td>
                    <td>{d.ten}</td>
                    <td>{d.sdt}</td>
                    <td>{d.diachi}</td>
                    <td>{d.gioitinh ? "Nam" : "Nữ"}</td>
                    <td>{d.trangthai == 0 ? "Đang làm" : "Đã nghỉ"}</td>
                    <td>{d.chucvu.ten}</td>
                    <td>
                      <Link
                        to={`/read/${d.id}`}
                        className="btn btn-sm btn-info me-2"
                      >
                        Read
                      </Link>
                      <Link
                        to={`/update/${d.id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< previous"

              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              breakClassName='page-item'
              breakLinkClassName='page-link'
              containerClassName='pagination justify-content-center'
              activeClassName='active'
            />

            <Confirm
              show={isShow}
              handleClose={handleClose}
              dataDelete={dataDelete}
              getAll={getAll}
            >
            </Confirm>

          </div>
        </Card>

          </SoftBox>

      
   


      <Card>

            <SoftBox display="flex" justifyContent="center" alignItems="center" p={3}>
              <h1>Hóa Đơn</h1>
            </SoftBox>
            <SoftBox>

            {/* //noi dung */}
              <Link to={'/don-hang/chi-tiet'}>
              <Button variant="primary">HDCT</Button>
              </Link>
                  


            {/* //end  */}

            </SoftBox>
          </Card>
          
       </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DonHang;
