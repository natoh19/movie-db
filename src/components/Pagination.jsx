import React from 'react'

const Pagination = ({moviesPerPage, totalMovies, paginAte}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className="pagination-pages">
            {
            pageNumbers.map(number => (
                <li key={number}
                    className="pagination-list">
                    <a href="!#"
                        onClick={
                            () => paginAte(number)
                        }
                        className="pagination-links">
                        {number}</a>
                </li>
            ))
        } </nav>
    )
}

export default Pagination;

