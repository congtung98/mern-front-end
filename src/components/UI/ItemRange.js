import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import './style.css'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ItemRange = React.memo(
  ({ min, max, data = [null, null], handleChange, name, title, step, marks }) => {
    const handleChangeInput = (e, index) => {
      let newValue;
      if (index === 0) {
        newValue = [e.target.value, data[1]];
      } else {
        newValue = [data[0], e.target.value];
      }
      handleChange && handleChange({ [name]: newValue });
    };
    const style = {
        height: 5,
        width: 5,
        backgroundColor: '#bbb',
        borderRadius: '50%',
        display: 'inline-block',
        color: 'transparent'
    }

    // const marks = {
    //     0: {
    //         label: '0',
    //         style 
    //     },
    //     5000000: {
    //         label: '1',
    //         style
    //     },
    //     10000000: {
    //         label: '2',
    //         style
    //     },
    //     15000000: {
    //         label: '3',
    //         style
    //     },
    //     20000000: {
    //         label: '4',
    //         style
    //     }  
    // }

    return (
      <div>
        <p>{title}</p>
        <Range
          min={min}
          max={max}
          step={step}
          defaultValue={data}
          value={data}
          dots={true}
          marks={marks}
          tipFormatter={(value) => `${value}đ`}
          onChange={(value) => handleChange && handleChange({ [name]: value })}
        />
        <div className="count-inputs">
          <input
            type="number"
            value={data[0]}
            onChange={(e) => handleChangeInput(e, 0)}
          />
          <span> to </span>
          <input
            type="number"
            value={data[1]}
            onChange={(e) => handleChangeInput(e, 1)}
          />
        </div>
      </div>
    );
  }
);

export default ItemRange;
