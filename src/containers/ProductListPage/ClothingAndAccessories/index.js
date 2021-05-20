import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import { getProductsBySlug } from '../../../redux/actions';
import { generatePublicUrl } from '../../../urlConfig';

import "./style.css";

const ClothingAndAccessories = (props) => {
    const product = useSelector((state) => state.product);
    const searchProduct = useSelector((state) => state.product.productsSearch);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    if(location.pathname === '/searchProducts'){
        if(searchProduct.length > 0){
            return (
                <div style={{ padding: "10px" }}>
                <Card
                    style={{
                        boxSizing: "border-box",
                        padding: "10px",
                        display: "flex"
                    }}
                >
                    {
                        searchProduct.map((product) => (
                            <div className="caContainer">
                                <Link
                                className="caImgContainer"
                                to={`/${product.slug}/${product._id}/p/${product.type}`}
                                >
                                    <img src={generatePublicUrl(product.productPictures[0].img)} alt="productimage"/>
                                </Link>
                                <div>
                                    <div className="caProductName">{product.name}</div>
                                    <div className="caProductPrice">
                                        <u>đ</u>
                                        {product.price}
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    }
                </Card>  
                </div>
            )   
        }else if(product.loading){
            return (                     
                <h1>...Loading</h1>
            )
        }else{
            return (    
                <div className="bodyContainer">                       
                    <div className="container">
                        <h2>Oops! Product not found.</h2>
                        <h1>404</h1>
                        <p>We can't find the product you're looking for.</p>
                        <a href="/">Go back home</a>
                    </div>
                </div>               
            )                   
        }
    }

    return (
        <div style={{ padding: "10px" }}>
            <Card
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex"
                }}
            >
                {
                    product.products.map((product) => (
                        <div className="caContainer">
                            <Link
                            className="caImgContainer"
                            to={`/${product.slug}/${product._id}/p/${product.type}`}
                            >
                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="productimage"/>
                            </Link>
                            <div>
                                <div className="caProductName">{product.name}</div>
                                <div className="caProductPrice">
                                    <u>đ</u>
                                    {product.price}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Card>
        </div>
    )
}

export default ClothingAndAccessories
