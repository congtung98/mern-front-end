import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import { getProductsBySlug } from '../../../redux/actions';
import { generatePublicUrl } from '../../../urlConfig';

import "./style.css";

const ClothingAndAccessories = (props) => {
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <div style={{ padding: "10px" }}>
            <Card
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex"
                }}
            >
                {product.products.map((product) => (
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
                ))}
            </Card>
        </div>
    )
}

export default ClothingAndAccessories
