import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { getOrder } from '../../redux/actions';
import Price from '../../components/UI/Price';

import './style.css';
import { generatePublicUrl } from '../../urlConfig';

const OrderDetailsPage = (props) => {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.user.orderDetails);

    useEffect(() => {
        const payload = {
            orderId: props.match.params.orderId,
        };
        dispatch(getOrder(payload));
    }, []);

    const formatDate = (date) => {
        if(date){
            const d = new Date(date);
            return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
        }
        return "";
    };

    const formatDate2 = (date) => {
        const month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        if(date){
            const d = new Date(date);
            return `${d.getDate()} ${month[d.getMonth()]}, ${d.getFullYear()}`;
        }
    };

    if(!(orderDetails && orderDetails.address)){
        return null;
    }

    const renderProductName = (item) => {
        if(item.smartphone){
            return `${item.productId.name} (${item.smartphone.color}, ${item.smartphone.storage}) (${item.smartphone.ram})`
        }else if(item.laptop){
            return `${item.productId.name} (${item.laptop.ram}, ${item.smartphone.hardDiskCapacity})`
        }else if(item.television){
            return `${item.productId.name} (${item.television.screenSize} inch)`
        }else if(item.furniture){
            return `${item.productId.name} (${item.furniture.primaryColor}, ${item.furniture.material})`
        }else if(item.clothing){
            return `${item.productId.name} (${item.clothing.color}, ${item.clothing.size})`
        }else{
            return item.productId.name;
        }
    }

    return (
        <Layout>
            <div
                style={{
                    width: "1160px",
                    margin: "10px auto",
                }}
            >
                <Card>
                    <div className="delAdrContainer">
                        <div className="delAdrDetails">
                            <div className="delTitle">Delivery Address</div>
                            <div className="delName">{orderDetails.address.name}</div>
                            <div className="delAddress">{orderDetails.address.address}</div>
                            <div className="delPhoneNumber">
                                Phone number {orderDetails.address.mobileNumber}
                            </div>
                        </div>
                        <div className="delMoreActionContainer">
                            <div className="delTitle">More Actions</div>
                            <div className="delName">Download Invoice</div>
                        </div>
                    </div>
                </Card>

                {orderDetails.items.map((item, index) => (
                    <Card
                        style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
                    >
                        <div className="flexRow">
                            <div className="delItemImgContainer">
                                <img src={generatePublicUrl(item.productId.productPictures[0].img)} alt=""/>
                            </div>
                            <div style={{ width: "250px" }}>
                                <div className="delItemName">{renderProductName(item)}</div>
                                <Price value={item.payablePrice} />
                            </div>
                        </div>
                        <div style={{ padding: "25px 50px" }}>
                            <div className="orderTrack">
                                {orderDetails.orderStatus.map((status) => (
                                    <div
                                        className={`orderStatus ${
                                            status.isCompleted ? "active" : ""
                                        }`}
                                    >
                                        <div className={`point ${status.isCompleted ? "active" : ""}`}>
                                        </div>
                                        <div className="orderInfo">
                                            <div className={`status ${status.isCompleted ? "active" : ""}`}>{status.type}</div>
                                            <div className="date">{formatDate(status.date)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: 14 }}>
                            {orderDetails.orderStatus[3].isCompleted &&
                                `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
                        </div>
                    </Card>
                ))}
            </div>
        </Layout>
    )
}

export default OrderDetailsPage
