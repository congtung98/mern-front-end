import React from 'react';
import './style.css';
import { 
    IoIosStar, 
    IoIosCheckmarkCircle, 
  } from 'react-icons/io';
  import { generatePublicUrl } from '../../../urlConfig';

const ReviewItem = (props) => {
    const { review } = props;

    const formatDate = (date) => {
        if(date){
            const d = new Date(date);
            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        }
        return "";
    };

    return (
        <div className="productReviewContainer">
            <div className="ratingReview">
                <span >{review.rating}</span>
                <IoIosStar />
            </div>
            <div className="flexRow" style={{ margin: "12px 0", alignItems: 'center', fontSize: 14 }}>
            {review.review}
            </div>
            <div className="flexRow">
            {review.productPictures.map((image, index) => (
                <div key={index} className="thumbnail">
                <img src={generatePublicUrl(image.img)} alt={image.img} />
                </div>
            ))}
            </div>
            <div className="flexRow">
            <p style={{ color: 'rgb(138, 138, 138)', fontSize: 12, fontWeight: 'bold' }}>{review.firstName} {review.lastName}</p>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
                <IoIosCheckmarkCircle color='rgb(138, 138, 138)' />
                <span style={{ color: 'rgb(138, 138, 138)', fontSize: 12, textAlign: 'center', marginLeft: 4 }}>Certified buyer at {formatDate(review.createdAt)}</span>
            </div>
        </div>
      </div>
    )
}

export default ReviewItem
