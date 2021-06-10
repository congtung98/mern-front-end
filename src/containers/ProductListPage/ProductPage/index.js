import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getQueryParams from '../../../utils/getQueryParams'
import { getProductPage } from '../../../redux/actions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card';
import { useHistory } from 'react-router';

const ProductPage = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const product = useSelector(state => state.product);
    const { page } = product;

    useEffect(() => {
        const params = getQueryParams(props.location.search);
        const payload = {
            params
        }

        dispatch(getProductPage(payload));
    }, []);

    const viewAllProducts = () => {
        history.push(`/${props.match.params.slug}${props.location.search}/undefined`)
    }

    return (
        <div style={{ margin: '0 10px' }}>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => {}}
                infiniteLoop={true}
                autoPlay={true}
                renderIndicator={false}
                showStatus={false}
            >
                {
                    page.banners && page.banners.map((banner, index) =>
                        <a 
                            key={index}
                            style={{ display: 'block' }}
                            href={banner.navigateTo}
                            // onClick={viewAllProducts}
                        >
                            <img src={banner.img} width="1409px"  alt=""/>
                        </a>
                    )
                }
            </Carousel>
            {/* <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '10px 0'
            }}>
                {
                    page.products && page.products.map((product, index) =>
                        <Card 
                            key={index}
                            style={{
                                width: '400px',
                                height: '200px',
                                margin: '0 5px'
                            }}    
                        >
                            <img style={{
                                width: '100%',
                                height: '100%'
                            }} src={product.img} alt=""/>
                        </Card>
                    )
                }
            </div> */}
        </div>
    )
}

export default ProductPage
