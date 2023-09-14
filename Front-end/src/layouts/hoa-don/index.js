// bosstrap 
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

// React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

//  React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";


function HoaDon() {


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>

          {/* //noi dung */}
    <Link to={'/hoa-don/chi-tiet'}>
    <Button variant="primary">HDCT</Button>
    </Link>
         


{/* //end  */}

      </SoftBox>
       </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default HoaDon;
