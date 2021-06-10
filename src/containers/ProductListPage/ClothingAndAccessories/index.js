import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import ItemRange from '../../../components/UI/ItemRange';
import { getProductsBySlug } from '../../../redux/actions';
import { generatePublicUrl } from '../../../urlConfig';
import FilterItem from './FilterItem';

import "./style.css";

export const PROPS = {
    RAM: 'ram',
    STORAGE: 'storage',
    SCREENSIZE: 'screenSize',
    COLOR: 'color',
    HDD: 'hardDiskCapacity',
    CPU: 'processor',
    VGA: 'graphicProcessor',
    GENRE: 'genre',
    SIZE: 'size',
    FABRIC: 'fabric',
    MATERIAL: 'material',
    PRIMARYCOLOR: 'primaryColor',
    OS: 'operatingSystem'
};

const style = {
    height: 5,
    width: 5,
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block',
    color: 'transparent'
}

export const MARKS = {
    EMARKS: {
        0: {
            label: '0',
            style 
        },
        5000000: {
            label: '1',
            style
        },
        10000000: {
            label: '2',
            style
        },
        15000000: {
            label: '3',
            style
        },
        20000000: {
            label: '4',
            style
        }  
    },
    FMARKS: {
        0: {
            label: '0',
            style 
        },
        2500000: {
            label: '1',
            style
        },
        5000000: {
            label: '2',
            style
        },
        7500000: {
            label: '3',
            style
        },
        10000000: {
            label: '4',
            style
        }  
    },
    CMARKS: {
        0: {
            label: '0',
            style 
        },
        500000: {
            label: '1',
            style
        },
        1000000: {
            label: '2',
            style
        },
        1500000: {
            label: '3',
            style
        },
        2000000: {
            label: '4',
            style
        }  
    },
    BMARKS: {
        0: {
            label: '0',
            style 
        },
        250000: {
            label: '1',
            style
        },
        500000: {
            label: '2',
            style
        },
        7500000: {
            label: '3',
            style
        },
        1000000: {
            label: '4',
            style
        }  
    }
}

const ClothingAndAccessories = (props) => {
    const product = useSelector((state) => state.product);
    const products = useSelector((state) => state.product.products);
    const productsVariants = useSelector((state) => state.product.productsVariants);
    const searchProduct = useSelector((state) => state.product.productsSearch);
    const dispatch = useDispatch();
    const location = useLocation();
    const [dataFilter, setDataFilter] = useState({
        price: [0, 20000000],
    });
    const [filters, setFilters] = useState({})
    const [filterProduct, setFilterProduct] = useState([]);

    const type = products[0]?.type;

    const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
    const mergedVariants = [].concat.apply([], productsVariants);
    const colors = mergedVariants.map(v => v.color);
    const ram = mergedVariants.map(v => v.ram);
    const storage = mergedVariants.map(v => v.storage);
    //clothing
    const size = mergedVariants.map(v => v.size);
    const fabric = mergedVariants.map(v => v.fabric);
    //laptop & television
    const processor = mergedVariants.map(v => v.processor);
    const hardDiskCapacity = mergedVariants.map(v => v.hardDiskCapacity);
    const graphicProcessor = mergedVariants.map(v => v.graphicProcessor);
    const screenSize = mergedVariants.map(v => v.screenSize);
    const operatingSystem = mergedVariants.map(v => v.operatingSystem);
    //furniture
    const primaryColor = mergedVariants.map(v => v.primaryColor);
    const material = mergedVariants.map(v => v.material);
    //book
    const genre = mergedVariants.map(v => v.genre);

    const uniqueColors = [...new Set(colors)].sort();
    const uniqueRam = [...new Set(ram)].sort(sortAlphaNum);
    const uniqueStorage = [...new Set(storage)].sort(sortAlphaNum);
    const uniqueSize = [...new Set(size)].sort();
    const uniqueFabric = [...new Set(fabric)].sort();
    const uniqueProcessor = [...new Set(processor)].sort();
    const uniqueHardDiskCapacity = [...new Set(hardDiskCapacity)].sort(sortAlphaNum);
    const uniqueGraphicProcessor = [...new Set(graphicProcessor)].sort();
    const uniqueScreenSize = [...new Set(screenSize)].sort();
    const uniqueOperatingSystem = [...new Set(operatingSystem)].sort();
    const uniquePrimaryColor = [...new Set(primaryColor)].sort();
    const uniqueMaterial = [...new Set(material)].sort();
    const uniqueGenre = [...new Set(genre)].sort();

    const handleChangeItem = (valueChange) => {
        setDataFilter({ ...dataFilter, ...valueChange });
      };
    
    const showFilteredResult = (filters) => {
        const allFilter = [];
        const allProduct = [];
        for (const f of Object.keys(filters)) {
                for (let i = 0; i < filters[f].length; i++) {
                    const filterVariantProducts = mergedVariants.filter(v => {
                        if(v[f] === filters[f][i]){
                            return v;
                        }
                    })
                    allFilter.push(filterVariantProducts);
                }
            }
        const mergedFilter = [].concat.apply([], allFilter);
        const uniqueFilter = [...new Set(mergedFilter)];
        const productFilter = uniqueFilter.map(u => u.product);
        const uniqueProduct = [...new Set(productFilter)];

        for (let i = 0; i < uniqueProduct.length; i++) {
            const filterProducts = products.filter(v => {
                if(v['_id'] === uniqueProduct[i]){
                    return v;
                }
            })
            allProduct.push(filterProducts);
        }
        const mergedProduct = [].concat.apply([], allProduct);
        console.log(mergedProduct, 'mang filter');
        setFilterProduct(mergedProduct);
    }

    const handleFilter = (_filters, category) => {
        const newFilters = { ...filters };
        
        newFilters[category] = _filters;

        showFilteredResult(newFilters);
        setFilters(newFilters);
    }

    const filterWithPrice = (priceRange) => {
        const rangePriceProducts = products.filter(p => {
            if(priceRange[0] <= p.price && p.price <= priceRange[1]){
                return p;
            }
        });

        setFilterProduct(rangePriceProducts);
    }

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
                        // display: "flex"
                    }}
                >
                    <div className="row">
                        {
                            searchProduct.map((product) => (
                                <div className="caContainer col-md-3">
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
                    </div>
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
        <div className="flexRow">
            <div className="filterContainer">
                <Card
                    style={{
                        boxSizing: "border-box",
                    }}
                >
                    <div className="filterTitle">
                        Filters
                    </div>
                    <div className="filterContent">
                        Price
                        <ItemRange
                            min={0}
                            max={
                                type === 'smartPhone' || type === 'laptop' || type === 'television' ? 20000000 : 
                                type === 'furniture' ? 10000000 :
                                type === 'clothing' ? 2000000 : 
                                1000000    
                            }
                            step={
                                type === 'smartPhone' || type === 'laptop' || type === 'television' ? 5000000 : 
                                type === 'furniture' ? 2500000 :
                                type === 'clothing' ? 500000 : 
                                250000
                            }
                            marks={
                                type === 'smartPhone' || type === 'laptop' || type === 'television' ? MARKS.EMARKS : 
                                type === 'furniture' ? MARKS.FMARKS :
                                type === 'clothing' ? MARKS.CMARKS : 
                                MARKS.BMARKS
                            }
                            data={dataFilter.price}
                            name={"price"}
                            handleChange={handleChangeItem}
                        />
                        <button className="btnPrice" onClick={() => filterWithPrice(dataFilter.price)}>Apply</button>
                    </div>
                    {type === 'smartPhone' ? (
                        <>
                            <FilterItem name="Ram" uniqueProps={uniqueRam} handleFilter={filters => handleFilter(filters, PROPS.RAM)} />
                            <FilterItem name="Internal Storage" uniqueProps={uniqueStorage} handleFilter={filters => handleFilter(filters, PROPS.STORAGE)} />
                            <FilterItem name="Screen Size" uniqueProps={uniqueScreenSize} handleFilter={filters => handleFilter(filters, PROPS.SCREENSIZE)} />
                            <FilterItem name="Color" uniqueProps={uniqueColors} handleFilter={filters => handleFilter(filters, PROPS.COLOR)} />
                        </>
                    ) : null}
                    {type === 'laptop' ? (
                        <>
                            <FilterItem name="Ram" uniqueProps={uniqueRam} handleFilter={filters => handleFilter(filters, PROPS.RAM)} />
                            <FilterItem name="Processor" uniqueProps={uniqueProcessor} handleFilter={filters => handleFilter(filters, PROPS.CPU)} />
                            <FilterItem name="Hard Disk Capacity" uniqueProps={uniqueHardDiskCapacity} handleFilter={filters => handleFilter(filters, PROPS.HDD)} />
                            <FilterItem name="Graphic Processor Name" uniqueProps={uniqueGraphicProcessor} handleFilter={filters => handleFilter(filters, PROPS.VGA)} />
                            <FilterItem name="Screen Size" uniqueProps={uniqueScreenSize} handleFilter={filters => handleFilter(filters, PROPS.SCREENSIZE)} />
                        </>   
                    ) : null}
                    {type === 'television' ? (
                        <>
                            <FilterItem name="Screen Size" uniqueProps={uniqueScreenSize} handleFilter={filters => handleFilter(filters, PROPS.SCREENSIZE)} />
                            <FilterItem name="Operating System" uniqueProps={uniqueOperatingSystem} handleFilter={filters => handleFilter(filters, PROPS.OS)} />  
                        </>
                    ) : null}
                    {type === 'clothing' ? (
                        <>
                            <FilterItem name="Size" uniqueProps={uniqueSize} handleFilter={filters => handleFilter(filters, PROPS.SIZE)} />
                            <FilterItem name="Fabric" uniqueProps={uniqueFabric} handleFilter={filters => handleFilter(filters, PROPS.FABRIC)} />
                            <FilterItem name="Color" uniqueProps={uniqueColors} handleFilter={filters => handleFilter(filters, PROPS.COLOR)} />
                        </>
                    ) : null}
                    {type === 'furniture' ? (
                        <>
                            <FilterItem name="Primary Color" uniqueProps={uniquePrimaryColor} handleFilter={filters => handleFilter(filters, PROPS.PRIMARYCOLOR)} />
                            <FilterItem name="Material" uniqueProps={uniqueMaterial} handleFilter={filters => handleFilter(filters, PROPS.MATERIAL)} />
                        </>
                    ) : null}
                    {type === 'book' ? (
                        <>
                            <FilterItem name="Genre" uniqueProps={uniqueGenre} handleFilter={filters => handleFilter(filters, PROPS.GENRE)} />
                        </>
                    ) : null}    
                </Card>
            </div>
            <div style={{ padding: "10px", width: '100%' }}>
                <Card
                    style={{
                        boxSizing: "border-box",
                        padding: "10px",
                        // display: "flex"
                    }}
                >
                    <div className="row">
                    {
                        filterProduct.length > 0 ?
                        filterProduct.map((product, index) => (                     
                            <div className="caContainer col-md-3" key={index}>
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
                        )) :
                        product.products.map((product, index) => (                     
                            <div className="caContainer col-md-3" key={index}>
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
                    </div>
                </Card>
        </div>
        </div>
    )
}

export default ClothingAndAccessories
