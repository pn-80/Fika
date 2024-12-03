import React from 'react';
import search from '../images/search.png'

const SearchBox = () => {
    return (
        <div className="tm-hero d-flex justify-content-center align-items-center">
            <form className="d-flex tm-search-form">
                <input className="form-control tm-search-input" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success tm-search-btn" type="submit">
                    <img src={search} alt="Logo" style={{ height: '60%', width: 'auto' }} />
                </button>
            </form>
        </div>
    );
}
export default SearchBox;
