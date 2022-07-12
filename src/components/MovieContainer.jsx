import React, {useState} from 'react';
import Modal from 'react-modal';
import '../App.css'
const API_IMAGE = "https://image.tmdb.org/t/p/w200"

Modal.setAppElement('#root')

const MovieContainer = ({title, poster_path, release_date, overview}) => {

    const [modelIsOpen, setModelIsOpen] = useState(false)

    const buttonClickHandler = () => {
        setModelIsOpen(true);
    }

    const src = `${API_IMAGE}/${poster_path}`

    const year = release_date ? release_date.slice(0, 4) : null

    const gridImage = poster_path ? <img alt={
            `${title} ${year}`
        }
        src={src}/> : "Poster Not Available"

    const modalImage = poster_path ? <img alt={
            `${title} ${year}`
        }
        src={src}/> : ""


    return (
        <div className="movie-div">
            <div className="movie-title-container">
                <h3> {title}</h3>
            </div>

            <div> {gridImage}</div>

            <div className="movie-info">
                <div style={
                    {
                        textAlign: 'center',
                        margin: '.4em'
                    }
                }>
                    Released: {year} </div>
                <div>
                    <button className="modal-btn"
                        onClick={
                            () => buttonClickHandler()
                    }>View Movie Details
                    </button>
                </div>

            </div>

            <Modal isOpen={modelIsOpen}
                className="movie-modal-container"

                onRequestClose={
                    () => setModelIsOpen(false)
            }>
                <div className="movie-modal">
                    {modalImage}
                    <div>
                        <h3> {title}</h3>
                        <p> {overview}</p>
                        <span>Release Year: {year}</span>
                        <div className="modal-close-btn-container">
                            <button className="modal-close-btn"
                                onClick={
                                    () => setModelIsOpen(false)
                            }>Close</button>
                        </div>

                    </div>

                </div>
            </Modal>

        </div>
    )
}


export default MovieContainer;
