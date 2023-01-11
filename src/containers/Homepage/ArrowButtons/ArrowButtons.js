import React from "react";
import './ArrowButtons.scss'

export function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <button
            className={"section-next"}
            onClick={onClick}
        >
            <i className='bx bx-chevron-right'></i>
        </button>
    );
}

export function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            className={"section-prev"}
            onClick={onClick}
        >
            <i className='bx bx-chevron-left'></i>
        </button>
    );
}