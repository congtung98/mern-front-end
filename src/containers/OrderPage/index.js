import React, { useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Breed } from '../../components/MaterialUI';
import Card from '../../components/UI/Card';
import { getOrders } from '../../redux/actions';
import { generatePublicUrl } from '../../urlConfig';
import "./style.css";

const OrderPage = (prosp) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    return (
        <Layout>
            <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
                <Breed
                    breed={[
                        { name: "Home", href: "/" },
                        { name: "My Account", href: "/account" },
                        { name: "My Orders", href: "/account/orders" }
                    ]}
                    breedIcon={<IoIosArrowForward />}
                />
                {
                    user.orders.map(order => {
                        return order.items.map(item => (
                            <Card style={{ margin: "5px auto" }}>
                                <div className="orderItemContainer">
                                    <div className="orderImgContainer">
                                        <img
                                            className="orderImg"
                                            src={generatePublicUrl(item.productId.productPictures[0].img)} alt=""/>
                                    </div>
                                    <div className="orderRow">
                                        <div className="orderName">
                                            {item.productId.name}
                                        </div>
                                        <div className="orderPrice"><u>đ</u>{item.payablePrice}</div>
                                        <div>{order.paymentStatus}</div>
                                    </div>
                                </div>
                            </Card>
                        ));
                    })
                }
            </div>
        </Layout>
    )
}

export default OrderPage
