/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
// import { Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import '../../scss/Content.scss';
import '../../scss/ChiTietSanPham.scss';
import { getAllBestseller, getAllSPNEW, getAllProduct } from '../../services/SanPhamService';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnhBanner from '../../assets/images/banner44.jpg';
import AnhBanner1 from '../../assets/images/333333.jpg';
import Chatbot from 'react-chatbot-kit';
import { createChatBotMessage } from 'react-chatbot-kit';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' }
];

function Content() {
  const [data, setData] = useState([]);
  const [productNew, setProductNew] = useState([]);
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const handleChatbotToggle = (e) => {
    e.stopPropagation();
    setChatbotOpen(!isChatbotOpen);
  };

  const config = {
    initialMessages: [createChatBotMessage(`Chào`)]
  };

  const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
      const botMessage = createChatBotMessage('Chào lần nữa');

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }));
    };

    const handleCC = () => {
      const botMessage = createChatBotMessage('Nói ít thôi');

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }));
    };

    const handleAo = () => {
      const botMessage = createChatBotMessage(
        'Áo polo là một trong những trang phục không thể thiếu với các bạn nam hiện nay. Áo polo với phần cổ gập độc đáo góp phần thể hiện sự trẻ trung, hiện đại và sang trọng cho người mặc. Trong bài viết hôm nay hãy cùng Coolmate review các dòng áo polo nam Coolmate bán chạy nhất và được ưa chuộng trên thị trường.'
      );

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }));
    };

    const handlePolo = () => {
      const botMessage = createChatBotMessage('Không bán');

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage]
      }));
    };

    // Put the handleHello function in the actions object to pass to the MessageParser
    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            actions: {
              handleHello,
              handleCC,
              handleAo,
              handlePolo
            }
          });
        })}
      </div>
    );
  };

  const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
      if (message.includes('chào')) {
        actions.handleHello();
      } else if (message.includes('áo') && message.includes('polo')) {
        actions.handleAo();
      } else if (message.includes('polo')) {
        actions.handlePolo();
      } else {
        actions.handleCC();
      }
    };

    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            parse: parse,
            actions
          });
        })}
      </div>
    );
  };

  useEffect(() => {
    getAllCTSP();
    getAllSP();
  }, []);

  const getAllCTSP = async () => {
    let allProduct;
    const res = await getAllBestseller();

    if (res && res.data && res.data.length > 0) {
      setData(res.data);
    } else {
      allProduct = await getAllProduct();
      setData(allProduct);
    }

    console.log(allProduct);
  };

  const getAllSP = async () => {
    const res = await getAllSPNEW();
    if (res && res.data) {
      setProductNew(res.data);
    }
  };

  const navigate = useNavigate();

  const handleDetail = (idCTSP, idSP, idMS) => {
    navigate(`/detail/${idCTSP}/${idSP}/${idMS}`);
    localStorage.setItem('idMS', idMS);
  };

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(number);
  }

  return (
    <>
      <section className="product">
        <div className="container">
          <div style={{ display: 'flex', paddingLeft: 17, paddingTop: 30 }}>
            <div className="col-4" style={{ width: 430, paddingRight: 30 }}>
              <Card.Img src="https://i.ytimg.com/vi/3K689mxA6a0/maxresdefault.jpg" />
            </div>
            <div className="col-4" style={{ width: 430, paddingRight: 30 }}>
              <Card.Img src={AnhBanner1} />
            </div>
            <div className="col-4" style={{ width: 430, paddingRight: 30 }}>
              <Card.Img src="https://bizweb.dktcdn.net/thumb/large/100/376/467/collections/z2137541763817-65adcff79dc0f58c8d9ac9d4110ffdcc.jpg?v=1603270072300" />
            </div>
          </div>
          <div style={{ paddingLeft: 17, paddingRight: 20, color: 'red' }}>
            <hr></hr>
          </div>
          <p className="title">Sản Phẩm Bán Chạy</p>
          <div className="row">
            {Array.isArray(data) &&
              data.slice(0, 8).map((product, index) => {
                return (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item" key={index}>
                    <Card
                      onClick={() => handleDetail(product.id, product.sanPham.id, product.mauSac.id)}
                      style={{ width: '260px', height: '400px' }}
                    >
                      <Card.Img
                        style={{ textAlign: 'center', width: '260px', height: '300px' }}
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                      />
                      <Card.Body>
                        <Card.Title>{product.sanPham.ten}</Card.Title>
                        <Card.Text>
                          <span>{convertToCurrency(product.giaBan)}</span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
          <div className="text-center">
            <button className="btn btn1">Xem tất cả </button>
          </div>
        </div>

        <div className="container">
          <Card.Img style={{ height: 250, paddingTop: 20 }} src={AnhBanner} />
        </div>

        <div className="container">
          <p className="title">Sản Phẩm Mới Nhất</p>
          <div className="row">
            {productNew.slice(0, 8).map((product, i) => {
              return (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item" key={i}>
                  <Card
                    onClick={() => handleDetail(product.id, product.sanPham.id, product.mauSac.id)}
                    style={{ width: '260px', height: '400px' }}
                  >
                    <Card.Img
                      style={{ textAlign: 'center', width: '260px', height: '300px' }}
                      src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                    />
                    <Card.Body>
                      <Card.Title>{product.sanPham.ten}</Card.Title>
                      <Card.Text>
                        <span>{convertToCurrency(product.giaBan)}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button className="btn btn1">Xem tất cả </button>
          </div>
        </div>
        <Box sx={{ position: 'fixed', bottom: 50, right: 50, zIndex: 1000 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
            onClick={handleChatbotToggle}
            open={isChatbotOpen}
          ></SpeedDial>
        </Box>
        {isChatbotOpen && (
          <Box sx={{ position: 'fixed', bottom: 70, right: 140, zIndex: 1000 }}>
            <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
          </Box>
        )}
      </section>
    </>
  );
}

export default Content;
