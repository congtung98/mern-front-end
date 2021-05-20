import React from 'react'
import { useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import { MaterialButton } from '../../components/MaterialUI'
import MenuHeader from '../../components/MenuHeader'
import Card from '../../components/UI/Card'
import banner1 from '../../images/home-banner-1.jpeg'
import banner2 from '../../images/home-banner-2.jpeg' 
import banner3 from '../../images/home-banner-3.jpeg'  

const HomePage = (props) => {
    const banners = [banner1, banner2, banner3];
    const product = useSelector(state => state.product);
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
                <div style={{ display: 'flex' }}>
                    {/* {
                        product.productsByPrice[key].map(product =>
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
                                        <Rating value="4.3" />
                                        &nbsp;&nbsp;
                                        <span
                                            style={{
                                                color: "#777",
                                                fontWeight: "500",
                                                fontSize: "12px",
                                            }}
                                        >
                                            (3353)
                                        </span>
                                    </div>
                                    <Price value={product.price} />
                                </div>
                            </Link>
                        )
                    } */}
                </div>
            </Card>
        </Layout>
    )
}

export default HomePage
