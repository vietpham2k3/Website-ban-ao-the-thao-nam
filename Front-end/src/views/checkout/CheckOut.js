import CheckoutForm from 'ui-component/checkout/CheckOut';
import { deleteByIdHD } from 'services/GioHangService';
import { useNavigate, useParams } from 'react-router';

function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBackToCart = () => {
    backToCart(id);
  };

  const backToCart = async (idHD) => {
    try {
      const res = await deleteByIdHD(idHD);
      if (res) {
        navigate('/gio-hang');
        setDataHDCT(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <CheckoutForm handleBackToCart={handleBackToCart} label={'Quay về giỏ hàng'} />
    </div>
  );
}
export default Checkout;
