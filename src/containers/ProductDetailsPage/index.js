import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginModal, getProductDetailsById, ratingProduct } from '../../redux/actions';
import Layout from '../../components/Layout';
import { 
  IoIosArrowForward, 
  IoIosStar, 
  IoMdCart,
  IoIosCheckmarkCircle, 
  IoIosCamera
} from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';
import ReactStars from "react-rating-stars-component";
import { MaterialButton, Modal } from '../../components/MaterialUI';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
import { addToCart } from '../../redux/actions';
import ReviewItem from './ReviewItem';
import { megaPixels, inches, kilograms } from './constant';


/**
* @author
* @function ProductDetailsPage
**/

const ProductDetailsPage = (props) => {

  const [categoryProd, setCategoryProd] = useState([]);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [alertCart, setAlertCart] = useState(false);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [file, setFile] = useState([]);
  const [variant, setVariant] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [productVariant, setProductVariant] = useState([]);
  const [keys, setKeys] = useState([]);
  const [productPictures, setProductPictures] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const product = useSelector(state => state.product);
  const category = useSelector(state => state.category);
  const rating = useSelector(state => state.product.productDetails.rating);
  const reviews = useSelector(state => state.product.productDetails.reviews);
  const variants = useSelector(state => state.product.productVariants);
  const orders = useSelector(state => state.user.orders);

  const user = window.localStorage.getItem('user');
  let userId = null;
  let productOrdered = [];
  if(user){
    userId = JSON.parse(user)._id;
  }

  orders.forEach((order) => {
    order.items.forEach(item => {
      productOrdered.push(item.productId._id);
    })
  })
  
  const userReviewed = reviews?.map((review) => review.userId);
  
  useEffect(() => {  
    const { productId, type } = props.match.params;
    const payload = {
      params: {
        productId,
        type
      }
    }
    dispatch(getProductDetailsById(payload));
  }, []);

  useEffect(() => {
    const categoriesProd = [];
    const { categories } = category;
    categories.forEach((cat) => {
      cat.children.forEach((child) => {
        if(child._id === product.productDetails.category){
          categoriesProd.push(cat.name);
          categoriesProd.push(child.name);
          setCategoryProd(categoriesProd);
        }else{
          child.children.forEach((c) => {
            if(c._id === product.productDetails.category){
              categoriesProd.push(cat.name);
              categoriesProd.push(child.name);
              categoriesProd.push(c.name);
              setCategoryProd(categoriesProd);
            }
          })
        }
      })
    })
    if(variants && variants[0]){
      const keys = Object.keys(variants[0]);
      const variantObj = { };
      keys.forEach(key => {
        if(key !== '_id' && 
          key !== 'createdBy' && 
          key !== 'createdAt' && 
          key !== 'updatedAt' && 
          key !== '__v' && 
          key !== 'product' &&
          key !== 'quantity'){
          let unique = [...new Set(variants.map(item => item[key]))];
          variantObj[key] = unique;
        }
      });
      setVariant(variantObj);
    }
  }, [product.productDetails])

  const formatText = (text) => {
    console.log(text, 'ok');
    let upperCaseText = text.toString().charAt(0).toUpperCase() + text.slice(1);
    if(upperCaseText.match(/[A-Z][a-z]+|[0-9]+/g)){
      return upperCaseText.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
    }
  }

  const sum = ( obj ) => {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
  }

  const ratingOverall = (rating) => {
    return ((rating[1] + rating[2]*2 + rating[3]*3 + rating[4]*4 + rating[5]*5) / sum(product.productDetails.rating)).toFixed(1);
  }

  const ratingChanged = (value) => {
    setRate(value);
    setReviewError(false);
  }

  const renderHeader = () => {
    switch(rate){
      case 1:
        return 'Very poor'
      case 2:
        return 'Poor'
      case 3:
        return 'Neutral'
      case 4:
        return 'Pleasure'
      case 5:
        return 'Very pleasure'
      default:
        return 'Please rate me!'
    }
  }

  const renderReviewPlaceholder = () => {
    switch(rate){
      case 1:
        return 'What is your problem?'
      case 2:
        return 'What is your problem?'
      case 3:
        return 'What is your problem?'
      case 4:
        return 'What is your problem?'
      case 5:
        return 'Why you like this product?'
      default:
        return 'Please sharing your experience about this product'
    }
  }

  const handleReview = () => {
    if(rate !== 0){
      const { productId } = props.match.params;

      const form = new FormData();
        form.append('_id', productId);
        form.append('rating', rate);
        form.append('review', review);

        for(let pic of productPictures){
            form.append('productPicture', pic);
        }

      dispatch(ratingProduct(form));
      setFile([]);
      setProductPictures([]);
      setReviewVisible(false);
      setReviewSuccess(true);
    }else{
      setReviewError(true);
    }
  }

  const fileInput = useRef(null);

  const handleFileUpload = event => {
    setFile([
      ...file,
      URL.createObjectURL(event.target.files[0])
    ]);
    setProductPictures([
      ...productPictures,
      event.target.files[0]
    ]);
  };

  const handleDeleteFile = (e) => {
    const s = productPictures.filter((item, index) => index !== e);
    const _update = file.filter((item, index) => index !== e);
    setProductPictures(s);
    setFile(_update)
  }

  const setVariantProduct = (e, key, v) => {
    if(keys.length > 0 && keys.some(e => e.value === v)){
      let _keys = keys.filter(k => k.value !== v); ;
      console.log(_keys, 'key');
      setKeys(_keys);
      e.target.classList.remove("variantSelected")
      let _variants = variants;
      _keys.forEach(pair => {
        _variants = _variants.filter(prod => prod[pair.key] === pair.value);
      })
      setProductVariant(_variants);
    }else{
      e.target.classList.add("variantSelected")
      setKeys([...keys, {key: key, value: v}]);
      if(productVariant.length === 0){
        const _productVariant = variants.filter(prod => prod[key] === v);
        setProductVariant(_productVariant);
        if(_productVariant.length === 1){
          let objArr = [];
          Object.keys(variant).forEach(key => {
            if(variant[key].length > 1){
              const obj = { key: key, value: _productVariant[0][key] }
              objArr.push(obj);
              console.log(obj, 'mck');
            }
          })
          setKeys([...objArr]);
        }
      }else{
        const _productVariant = productVariant.filter(prod => prod[key] === v);
        if(_productVariant.length === 1){
          let objArr = [];
          Object.keys(variant).forEach(key => {
            if(variant[key].length > 1){
              const obj = { key: key, value: _productVariant[0][key] }
              objArr.push(obj);
              console.log(obj, 'mck');
            }
          })
          setKeys([...objArr]);
        }
          setProductVariant(_productVariant);
      }
    }
  }

  console.log(productVariant, keys, 'mck');

  if(Object.keys(product.productDetails).length === 0){
    return null;
  }

  return (
    <Layout>
      <Modal
        style={{ maxWidth: '100%' }} 
        visible={reviewVisible}
        onClose={() => {
          setReviewVisible(false);
          setRate(0);
          setReviewError(false);
        }}
      >
        <div className="reviewModal">
          <div className="reviewHeader">{renderHeader()}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={30}
              activeColor="#ffd700"
            />
          </div>
            {
              reviewError ? <div className="ratingMessage">You need to rating before submit!</div> : null
            }
          <textarea 
            className="reviewInput boxsizingBorder" 
            name="" 
            id="" 
            cols="30" 
            rows="8"
            onChange={(e) => setReview(e.target.value)}
            placeholder={renderReviewPlaceholder()}
          ></textarea>
          <div className="flexRow">
            {
              file.map((img, index) => (
                <img key={index} className="reviewImage" src={img} onClick={() => handleDeleteFile(index)}/>
              ))
            }
          </div>
          <div className="flexRow">
            <input
              ref={fileInput}
              onChange={handleFileUpload}
              type="file"
              style={{ display: "none" }}
              // multiple={false}
            />
            <MaterialButton 
              title="Add product pictures"
              textColor="#0d5cb6"
              bgColor="#ffffff"
              border="1px solid rgb(13, 92, 182)"
              style={{
                marginRight: '5px'
              }}
              icon={<IoIosCamera />}             
              onClick={() => fileInput.current.click()}
            />
            <MaterialButton 
              title="Submit"
              bgColor="rgb(253, 216, 53)"
              textColor="#000000"
              border="1px solid #fdd835"
              style={{
                marginRight: '5px'
              }}             
              onClick={() => handleReview()}
            />
          </div>
        </div>
      </Modal>
      <Modal
        visible={reviewSuccess}
        style={{ maxWidth: '100%' }} 
      >
        <div className="reviewSuccessModal">
          <div className="reviewHeader">Thank you for your review!</div>
          <div style={{ marginBottom: 50 }}>We will notify you once the review is approved. Your reviews help people shop better</div>
          <div className="flexRow" style={{ justifyContent: 'center' }}>
            <MaterialButton 
              title="OK"
              bgColor="#0d5cb6"
              textColor="#fff"
              style={{
                width: 120
              }}      
              width="120px"       
              onClick={() => setReviewSuccess(false)}
            />
          </div>
        </div>
      </Modal>
      <Modal
        visible={alertCart}
        style={{ maxWidth: '100%' }} 
      >
        <div className="reviewSuccessModal">
          <div className="reviewHeader">Alert</div>
          <div style={{ marginBottom: 50 }}>You must choose all variant to continue add to cart!</div>
          <div className="flexRow" style={{ justifyContent: 'center' }}>
            <MaterialButton 
              title="OK"
              bgColor="#0d5cb6"
              textColor="#fff"
              style={{
                width: 120
              }}      
              width="120px"       
              onClick={() => setAlertCart(false)}
            />
          </div>
        </div>
      </Modal>
      <div className="productDescriptionContainer">
        <div className="flexRow leftContent">
          <div className="verticalImageStack">
            {
              product.productDetails.productPictures.map((thumb, index) => 
              <div className="thumbnail" onClick={() => setImgSrc(thumb.img)}>
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              </div>
              )
            }
            {/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> */}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img src={generatePublicUrl( imgSrc || product.productDetails.productPictures[0].img )} alt={`${product.productDetails.productPictures[0].img}`} />
            </div>

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: '5px'
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  let count = 0;
                  Object.keys(variant).forEach(v => {
                    if(variant[v].length > 1){
                      count++;
                    }
                  });
                  if(productVariant.length !== 1 && variants.length > 1 || count > keys.length){
                    setAlertCart(true);
                  }else if(productVariant.length === 1){
                    const { _id, name, price, type } = product.productDetails;
                    const variantId = productVariant[0]._id;
                    const img = product.productDetails.productPictures[0].img;
                    dispatch(addToCart({ _id, name, price, img, type, variantId }));
                    props.history.push(`/cart`);
                  }else{
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    dispatch(addToCart({ _id, name, price, img }));
                    props.history.push(`/cart`);
                  }
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: '5px'
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div className="rightContent">

          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li><a href="#">Home</a><IoIosArrowForward /></li>
              {
                categoryProd.map((cat) => {
                  return (
                    <li key={cat}><a href="#">{cat}</a><IoIosArrowForward /></li>
                  )
                })
              }
              {/* <li><a href="#">{parentCategoryProd}</a><IoIosArrowForward /></li>
              <li><a href="#">{categoryProd}</a><IoIosArrowForward /></li> */}
              <li><a href="#">{product.productDetails.name}</a></li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
              <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">{isNaN(ratingOverall(product.productDetails.rating)) ? 0 : ratingOverall(product.productDetails.rating)}<IoIosStar /></span>
              <span className="ratingNumbersReviews">{sum(rating)} Ratings & {reviews.length} Reviews</span>
            </div>
            <div className="extraOffer">Extra <BiRupee />4500 off </div>
            <div className="flexRow priceContainer">
              <span className="price"><u>đ</u>{product.productDetails.price}</span>
              <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
              {/* <span>i</span> */}
              </div>
            <div>
              <p style={{ 
                color: '#212121', 
                fontSize: '14px',
                fontWeight: '600' 
                }}>Available Offers</p>
              
              {
                Object.keys(variant).map((key, value) => {
                  return(
                    <p style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="variantKey">{formatText(key)}</span>
                    {
                      variant[key].length > 1 ? (
                        variant[key].map(v => (
                          <div                           
                            onClick={(e) => {
                              setVariantProduct(e, key, v)                             
                            }} 
                            className={productVariant.length > 0 && !productVariant.some(e => e[key] === v) ? 
                              'variantDisable': 
                              `variantChoice ${productVariant.length === 1 && productVariant.some(e => e[key] === v) || keys.some(e => e.value === v) ? 'variantSelected' : null} `}
                            style={{ cursor: 'pointer' }}
                          >
                            {v}
                          </div>
                        ))
                      ) :  (
                        <span style={{
                          fontSize: '12px',
                          color: '#212121',
                        }}>
                          { 
                            megaPixels.includes(key) ? `${variant[key][0]} MP` : 
                            inches.includes(key) ? `${variant[key][0]} inch` :
                            kilograms.includes(key) ? `${variant[key][0]} kg` :
                            variant[key][0]
                          }
                        </span>
                      )
                    }                  
                    </p>
                  )
              })
              }
              <p style={{ display: 'flex' }}>
                <span style={{
                  width: '100px',
                  fontSize: '12px',
                  color: '#878787',
                  fontWeight: '600',
                  marginRight: '20px'
              }}>Description</span>
              <span style={{
                fontSize: '12px',
                color: '#212121',
              }}>{product.productDetails.description}</span>
              </p>
            </div>
            <div className="productRatingContainer">
              <div className="flexRow ratingHeader">
                <div className="ratingTitle">Rating & Reviews</div>
                <div style={{ padding: '24px 24px 0 24px'}}>
                  {
                    userReviewed.includes(userId) || !productOrdered.includes(props.match.params.productId) ?
                    null : 
                    <MaterialButton
                      title="Rate Product"
                      bgColor="#ffffff"
                      textColor="#000000"
                      fontWeight={500}
                      style={{
                        marginRight: '5px'
                      }}             
                      onClick={() => auth.authenticate ? setReviewVisible(true) : dispatch(checkLoginModal(true))}
                    />
                  }
                </div>
              </div>
              <div className="flexRow">
                <div style={{ width: "33.33%", paddingTop: 30 }}>
                  <div className="flexRow" style={{ paddingLeft: 100 }}>
                    <div className="ratingOverall">{isNaN(ratingOverall(product.productDetails.rating)) ? 0 : ratingOverall(product.productDetails.rating)}</div>
                    <div className="star">
                      <IoIosStar />
                    </div>
                  </div>
                  <div>
                    {sum(rating)} & {reviews.length} Reviews
                  </div>
                </div>
                <div className="flexRow">
                    <ul style={{ paddingLeft: 2 }}>
                      {
                        Object.keys(rating).reverse().map((r, i) => (
                          <li key={i}>
                            <div>
                              <span>{r}</span>
                              <span style={{ fontSize: 14, paddingLeft: 2}}><IoIosStar /></span>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                    <ul style={{ paddingLeft: 10 }}>
                      <li className="liRatingBar">
                        <div>
                          <div className="ratingBar">
                            <span className="ratingProgress" style={{ width: `${rating[5]/sum(rating)*100}%`, backgroundColor: '#388e3c'}}></span>
                          </div>
                        </div>
                      </li>
                      <li className="liRatingBar">
                        <div>
                          <div className="ratingBar">
                            <span className="ratingProgress" style={{ width: `${rating[4]/sum(rating)*100}%`, backgroundColor: '#388e3c'}}></span>
                          </div>
                        </div>
                      </li>
                      <li className="liRatingBar">
                        <div>
                          <div className="ratingBar">
                            <span className="ratingProgress" style={{ width: `${rating[3]/sum(rating)*100}%`, backgroundColor: '#388e3c'}}></span>
                          </div>
                        </div>
                      </li>
                      <li className="liRatingBar">
                        <div>
                          <div className="ratingBar">
                            <span className="ratingProgress" style={{ width: `${rating[2]/sum(rating)*100}%`, backgroundColor: '#ff9f00'}}></span>
                          </div>
                        </div>
                      </li>
                      <li className="liRatingBar">
                        <div>
                          <div className="ratingBar">
                            <span className="ratingProgress" style={{ width: `${rating[1]/sum(rating)*100}%`, backgroundColor: '#ff6161'}}></span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <ul style={{ paddingLeft: 2 }}>
                      {
                        Object.values(rating).reverse().map((r,i) => (
                          <li key={i} className="rateCount">{r}</li>
                        ))
                      }
                    </ul>
                </div>
              </div>
              <div className="flexRow" style={{ padding: '0 24px 24px'}}>
                {
                  reviews.map((review) => (
                    review.productPictures.map((image, index) => (
                      <div key={index} className="reviewImg" style={{ backgroundImage: `url(${generatePublicUrl(image.img)})`}}/>
                    ))
                  ))
                }
              </div>
            </div>
            {
              reviews.map((review) => (                
                  <ReviewItem review={review} />
                )
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  )

}

export default ProductDetailsPage
