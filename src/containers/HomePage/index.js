import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import { MaterialButton } from '../../components/MaterialUI'
import MenuHeader from '../../components/MenuHeader'
import Card from '../../components/UI/Card'
import Price from '../../components/UI/Price'
import Rating from '../../components/UI/Rating'
import { calculateOffer, ratingOverall, sum } from '../../helpers'
import banner1 from '../../images/home-banner-1.jpeg'
import banner2 from '../../images/home-banner-2.jpeg' 
import banner3 from '../../images/home-banner-3.jpeg'  
import { getBestOfferProducts } from '../../redux/actions'
import { generatePublicUrl } from '../../urlConfig'

const HomePage = (props) => {
    const banners = [banner1, banner2, banner3];
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBestOfferProducts());
    }, []);

    return (
        <Layout>
            <Carousel
                renderThumbs={() => {}}
                infiniteLoop={true}
                autoPlay={true}
                showIndicators={false}
                showStatus={false}
            >
                {
                    banners && banners.map((banner, index) =>
                        <img src={banner} width="1409px"  alt=""/>
                    )
                }
            </Carousel>
            <Card
                headerLeft={`Deal of the day`}
                headerRight={
                    <MaterialButton
                        title={"VIEW ALL"}
                        style={{
                        width: "96px",
                        }}
                        bgColor="#2874f0"
                        fontSize="12px"
                    />
                }
                style={{
                    width: 'calc(100% - 40px)',
                    margin: '20px'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        product.products.map((product, index) =>
                            <Link
                                key={index}
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
                                    <Rating value={ isNaN(ratingOverall(product, index, product.rating)) ? 0 : ratingOverall(product, index, product.rating)} />
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
        </Layout>
    )
}

export default HomePage
