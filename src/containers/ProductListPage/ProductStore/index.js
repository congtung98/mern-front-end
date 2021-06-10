import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../redux/actions/product.actions';
import { generatePublicUrl } from '../../../urlConfig';
import { Link, useHistory } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import Rating from '../../../components/UI/Rating';
import Price from '../../../components/UI/Price';
import { MaterialButton } from '../../../components/MaterialUI';
import { calculateOffer, sum } from '../../../helpers';

const ProductStore = (props) => {

    const product = useSelector(state => state.product);
    const priceRange = product.priceRange;
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);


    const ratingOverall = (key, index, rating) => {
        return ((rating[1] + rating[2]*2 + rating[3]*3 + rating[4]*4 + rating[5]*5) / sum(product.productsByPrice[key][index].rating)).toFixed(1);
    }


    const viewAllProducts = () => {
       history.push(`/${props.match.params.slug}${props.location.search}/undefined`)
    }

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
                            headerRight={
                                <MaterialButton
                                    title={"VIEW ALL"}
                                    style={{
                                    width: "96px",
                                    }}
                                    bgColor="#2874f0"
                                    fontSize="12px"
                                    onClick={viewAllProducts}
                                />
                            }
                            style={{
                                width: 'calc(100% - 40px)',
                                margin: '20px'
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].slice(0,6).map((product, index) =>
                                        <Link 
                                            to={`/${product.slug}/${product._id}/p/${product.type}`}
                                            style={{
                                                display: 'block',
                                                textDecoration: "none",
                                                color: "#000",
                                            }} 
                                            className="productContainer"
                                        >    
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt=""/>
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: '10px 0' }}>{product.name}</div>
                                                <div>
                                                    <Rating value={ isNaN(ratingOverall(key, index, product.rating)) ? 0 : ratingOverall(key, index, product.rating)} />
                                                    &nbsp;&nbsp;
                                                    <span
                                                        style={{
                                                            color: "#777",
                                                            fontWeight: "500",
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        {`(${sum(product.rating)})`}
                                                    </span>
                                                </div>
                                                <div className="flexRow" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <Price value={product.offer ? product.price - calculateOffer(product.price, product.offer) : product.price} />
                                                    {
                                                        product.offer ? 
                                                        <>
                                                        <span className="originPrice">đ{product.price}</span> 
                                                        <span className="flexRow discount" style={{ margin: '0 10px', alignItems: 'center' }}>{product.offer}% off</span>
                                                        </>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </Card>
                    );
                })
            }   
        </>
    )
}

export default ProductStore
