/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import style from "@/styles/pages/detailProductStyle.module.scss";
import Link from "next/link";
import Navbar from "@/components/organisms/navbar";
import CardProductNew from "@/components/molecules/cardProductNew";
import Footer from "@/components/organisms/footer";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
//REDUX
import { useSelector } from "react-redux";
//MUI
import {
  Card,
  CardContent,
  Modal,
  Button,
  Typography,
  Alert,
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
  InputLabel,
  Rating,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { styled } from "@mui/material/styles";

const MyCard = styled(Card)({
  margin: "auto",
  marginTop: "10%",
  maxWidth: 500,
  textAlign: "center",
  borderRadius: "20px",
  padding: "25px",
  borderColor: "red",
});

const MyModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderColor: "red",
});

const MyButton = styled(Button)({
  borderRadius: "20px",
  marginRight: "20px",
  background: "#DB3022",
  color: "white",
  "&:hover": {
    background: "#DB2522",
    border: "none",
  },
});

export default function DetailProduct(props) {
  const productListNew = props.productListNew;
  const products = useSelector((state) => state);

  const [productNew, setProductNew] = React.useState(productListNew.data);
  const [getProducts, setGetProducts] = React.useState(
    products.product.data.data
  );
  const [color, setColor] = React.useState("");
  const [size, setSize] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalSuccess, setShowModalSuccess] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [isErr, setIsErr] = React.useState(false);
  const [getButton, setGetButton] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [getToken, setGetToken] = React.useState(null);

  const router = useRouter();

  React.useEffect(() => {
    let token = props.token;

    if (props.token) {
      setGetToken(token);
    }
  }, []);

  const handleSubmit = () => {
    if (!size || !color) {
      if (!size && !color) {
        setErrMsg("Size & Color not selected");
        setIsErr(true);
        setShowModal(true);
      } else if (!color) {
        setErrMsg("Color not selected");
        setIsErr(true);
        setShowModal(true);
      } else if (!size) {
        setErrMsg("Size not selected");
        setIsErr(true);
        setShowModal(true);
      }
    } else {
      setIsErr(false);

      handleCheckout();
    }
  };

  const handleCheckout = async () => {
    try {
      if (!size || !color) {
        if (!size && !color) {
          setErrMsg("Size & Color not selected");
          setIsErr(true);
          setShowModal(true);
          return;
        } else if (!color) {
          setErrMsg("Color not selected");
          setIsErr(true);
          setShowModal(true);
          return;
        } else if (!size) {
          setErrMsg("Size not selected");
          setIsErr(true);
          setShowModal(true);
          return;
        }
      } else {
        setIsErr(false);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      };

      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/add`,
        {
          products_id: getProducts?.products_id,
          color,
          size,
          qty: quantity,
        },
        config
      );
      setIsLoading(false);

      if (getButton == "addbag") {
        handleOpenSuccess();
      }
      if (getButton == "buynow") {
        // router.push("/checkout");
        router.push("/bag/my-bag");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  // console.log("color--", color, "qty---", quantity, "size---",size);
  // console.log(props.token)

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpenSuccess = () => {
    setShowModalSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowModalSuccess(false);
  };

  const capitalize = (str) => {
    return str.replace(/(^\w|\s\w)/g, function (letter) {
      return letter.toUpperCase();
    });
  };

  const convertNumber = (str) => {
    return str.replace(/\d(?=(\d{3})+$)/g, "$&.");
  };

  console.log("getProducts---", getProducts);

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity > getProducts.qty) {
      setQuantity(getProducts.qty);
      return;
    }
    if (quantity == getProducts.qty) {
      return;
    }
    setQuantity(quantity + 1);
  };

  return (
    <>
      <Head>
        <title>
          {getProducts.product_name} | {getProducts.store_name} | Blanja
        </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <MyModal open={showModal} onClose={handleClose}>
          <MyCard>
            <CardContent>
              {/* <Typography variant="h4">Verification email sent!</Typography>
               */}
              <Alert
                variant="filled"
                severity="error"
                sx={{ justifyContent: "center" }}
              >
                <strong style={{ fontSize: "16px" }}>{errMsg}</strong>
              </Alert>

              <Typography variant="body1" sx={{ margin: "20px" }}>
                Please complete required fields{" "}
              </Typography>

              <div style={{ display: "flex", flexDirection: "column" }}></div>
            </CardContent>
          </MyCard>
        </MyModal>

        <MyModal open={showModalSuccess} onClose={handleCloseSuccess}>
          <MyCard>
            <CardContent>
              {/* <Typography variant="h4">Verification email sent!</Typography>
               */}
              <Alert
                variant="filled"
                severity="success"
                sx={{ justifyContent: "center" }}
              >
                <strong style={{ fontSize: "16px" }}>
                  Success add Product to Cart
                </strong>
              </Alert>

              {/* <Typography variant="body1" sx={{ margin: "20px" }}>
                Please complete required fields{" "}
              </Typography> */}

              {/* <div style={{ display: "flex", flexDirection: "column" }}></div> */}
            </CardContent>
          </MyCard>
        </MyModal>

        <div className="container-fluid p-0">
          {/* NAVBAR */}
          <nav
            className={`container-fluid sticky-sm-top shadow py-2 ${style.containerNavbar}`}
          >
            <Navbar />
          </nav>
          {/* END OF NAVBAR */}

          {/* CONTENT PRODUCT */}
          <section className={`container py-5 ${style.content}`}>
            {/* BREADCRUMB */}
            <nav aria-label="breadcrumb" className={`mb-5 ${style.breadcrumb}`}>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#">category</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {capitalize(getProducts?.category)}
                </li>
              </ol>
            </nav>

            {/* SELECT PRODUCT */}
            <div className={`${style.selectProduct}`}>
              <div className="row">
                <div className={`col-4 pt-1 ${style.imgProduct}`}>
                  {getProducts.products_picture.length == 1 ? (
                    <img
                      className={`shadow-sm rounded-3`}
                      src={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${getProducts?.products_picture[0]?.product_picture}`}
                      alt="imgProduct"
                    />
                  ) : (
                    <div id="carouselExampleIndicators" class="carousel slide">
                      <div class="carousel-indicators">
                        {getProducts.products_picture.map((item, key) => (
                          <button
                            key={key}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={key}
                            className={key === 0 ? "active" : ""}
                            aria-current={key === 0 ? "true" : ""}
                            aria-label={`Slide ${key + 1}`}
                          ></button>
                        ))}
                      </div>
                      <div className="carousel-inner">
                        {getProducts.products_picture.map((item, key) => (
                          <div
                            key={key}
                            className={`carousel-item ${
                              key === 0 ? "active" : ""
                            }`}
                          >
                            <img
                              src={`https://res.cloudinary.com/daouvimjz/image/upload/v1676281237/${item?.product_picture}`}
                              className="d-block w-100"
                              alt={item?.product_picture}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className={`col-8 ${style.sideRight}`}>
                  <div className="row">
                    <h3 className={style.title}>
                      {capitalize(getProducts?.product_name)}
                    </h3>
                    <p className={style.brand}>
                      {capitalize(getProducts?.brand)}
                    </p>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Rating
                        name="read-only"
                        value={getProducts.avg_review}
                        precision={0.01}
                        readOnly
                        size="small"
                      />
                      <Typography
                        component="legend"
                        style={{ marginLeft: "8px", color: "#9B9B9B" }}
                      >
                        <span style={{ color: "black" }}>
                          {getProducts.avg_review}{" "}
                        </span>
                        ({getProducts.review.length} rating) |
                        <span style={{ color: "black" }}>
                          {" "}
                          Sold {getProducts?.item_sold_count}
                        </span>
                      </Typography>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className={`col-3 ${style.price}`}>
                      <p>Price</p>
                      <h4>Rp. {convertNumber(getProducts?.price)}</h4>
                    </div>
                    <div className="col-4">
                      <h5>
                        Qty
                        <span style={{ fontSize: "14px", color: "#9B9B9B" }}>
                          &nbsp; (Available item: {getProducts.qty})
                        </span>
                      </h5>
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
                          <li class="page-item">
                            <a
                              class="page-link border rounded-circle border-2 fw-bold"
                              aria-label="Previous"
                              style={{
                                borderRadius: "50px",
                                borderColor: "black",
                              }}
                              onClick={decrement}
                            >
                              <span
                                aria-hidden="true"
                                style={{ color: "black" }}
                              >
                                -
                              </span>
                            </a>
                          </li>
                          <li class="page-item">
                            <a
                              class="page-link border-0"
                              style={{ color: "black" }}
                            >
                              {quantity}
                            </a>
                          </li>
                          <li class="page-item">
                            <a
                              class="page-link border rounded-circle border-2 fw-bold"
                              aria-label="Next"
                              onClick={increment}
                            >
                              <span
                                aria-hidden="true"
                                style={{ color: "black" }}
                              >
                                +
                              </span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  {/* SIZE */}
                  <div className="row" style={{ marginTop: "30px" }}>
                    <div className={`col-3 ${style.color}`}>
                      {/* <h5>Color</h5> */}
                      <FormControl required sx={{ m: 1, minWidth: 160 }}>
                        <InputLabel id="demo-simple-select-success-label">
                          Color
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={color}
                          label="Color *"
                          onChange={handleChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {getProducts.color.map((item, key) => (
                            <MenuItem key={key} value={item}>
                              {capitalize(item)}
                            </MenuItem>
                          ))}
                        </Select>
                        {!color ? (
                          <FormHelperText sx={{ color: "red" }}>
                            Required
                          </FormHelperText>
                        ) : (
                          <FormHelperText sx={{ color: "white" }}>
                            -
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>

                    <div className="col-3">
                      {/* <h5>Size</h5> */}
                      <FormControl required sx={{ m: 1, minWidth: 160 }}>
                        <InputLabel id="demo-simple-select-required-label">
                          Size
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={size}
                          label="Sizes *"
                          onChange={handleChangeSize}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {getProducts.size.map((item, key) => (
                            <MenuItem key={key} value={item}>
                              {capitalize(item)}
                            </MenuItem>
                          ))}
                        </Select>
                        {!size ? (
                          <FormHelperText sx={{ color: "red" }}>
                            Required
                          </FormHelperText>
                        ) : (
                          <FormHelperText sx={{ color: "white" }}>
                            -
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className={`col-12 ${style.btnProduct}`}>
                      <div
                        // href={"/bag/my-bag"}
                        // onClick={() => {
                        //   handleSubmit()
                        //   setGetButton('addbag')
                        // }}
                        type="button"
                        className={`btn btn-outline-secondary rounded-pill me-3 ${style.btnChat}`}
                      >
                        Chat
                      </div>

                      {isLoading ? (
                        <LoadingButton
                          loading={isLoading}
                          variant="contained"
                          color="primary"
                          sx={{
                            borderRadius: "20px",
                            marginRight: "20px",
                            background: "#DB3022",
                            color: "black",
                            width: "250px",
                          }}
                          onClick={() => {
                            setGetButton("addbag");
                            handleCheckout();
                          }}
                        >
                          {isLoading ? "Loading..." : "Add to Cart"}
                        </LoadingButton>
                      ) : (
                        <MyButton
                          variant="contained"
                          color="primary"
                          sx={{
                            width: "250px",
                          }}
                          onClick={() => {
                            setGetButton("addbag");
                            handleCheckout();
                          }}
                        >
                          Add to Cart
                        </MyButton>
                      )}

                      {isLoading ? (
                        <LoadingButton
                          loading={isLoading}
                          variant="contained"
                          color="primary"
                          sx={{
                            borderRadius: "20px",
                            background: "#DB3022",
                            color: "black",
                            width: "250px",
                          }}
                          onClick={() => {
                            setGetButton("buynow");
                            handleCheckout();
                          }}
                        >
                          {isLoading ? "Loading..." : "Buy Now"}
                        </LoadingButton>
                      ) : (
                        <MyButton
                          variant="contained"
                          color="primary"
                          sx={{
                            width: "250px",
                          }}
                          onClick={() => {
                            setGetButton("buynow");
                            handleCheckout();
                          }}
                        >
                          Buy Now
                        </MyButton>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCT INFORMATION */}
            <div
              className={`mt-5 border-bottom pb-5 border-2 ${style.productInformation}`}
            >
              <div className={`mb-4 ${style.subTitle}`}>
                <h4>Informasi Produk</h4>
              </div>
              <div className={`mb-4 ${style.condition}`}>
                <h5>Condition</h5>
                <p>{capitalize(getProducts?.condition)}</p>
              </div>
              <div className={`mb-5 ${style.Description}`}>
                <h5>Description</h5>
                <p>{getProducts?.description}</p>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>
                  Donec non magna rutrum, pellentesque augue eu, sagittis velit.
                  Phasellus quis laoreet dolor. Fusce nec pharetra quam.
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Praesent sed enim vel turpis blandit imperdiet ac ac felis.
                  Etiam tincidunt tristique placerat. Pellentesque a consequat
                  mauris, vel suscipit ipsum. Donec ac mauris vitae diam commodo
                  vehicula. Donec quam elit, sollicitudin eu nisl at, ornare
                  suscipit magna
                </p>
                <p>
                  onec non magna rutrum, pellentesque augue eu, sagittis velit.
                  Phasellus quis laoreet dolor. Fusce nec pharetra quam.
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Praesent sed enim vel turpis blandit imperdiet ac ac felis.
                </p>
                <p>In ultricies rutrum tempus. Mauris vel molestie orci.</p> */}
              </div>
              <div className={`${style.productReview}`}>
                <h3>Product review</h3>
              </div>
            </div>

            {/* LIKE THIS */}
            <div className={`mt-5 ${style.likeThis}`}>
              <h2>You can also like this</h2>
              <p>You’ve never seen it before!</p>
              <div className={`row ${style.content}`}>
                {productNew?.map((item, key) => (
                  <React.Fragment key={key}>
                    <div className="col-3 mb-4">
                      <CardProductNew
                        img={item?.products_picture[0]?.product_picture}
                        productName={item?.product_name}
                        price={item?.price}
                        storeName={item?.store_name}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
          {/* END OF CONTENT PRODUCT */}

          {/* FOOTER */}
          <Footer />
          {/* END OF FOOTER */}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const productNew = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?sort=DESC&categoryFilter=tshirt`
  );

  const convertProductNew = productNew.data;
  const token = getCookie("token", context) || "";
  return {
    props: {
      productListNew: convertProductNew,
      token,
    }, // will be passed to the page component as props
  };
}
