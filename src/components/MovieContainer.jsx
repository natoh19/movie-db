import React, {useState} from 'react';
import Modal from 'react-modal';
const API_IMAGE = "https://image.tmdb.org/t/p/w200"

Modal.setAppElement('#root')
// This is needed so screen readers don't see main content when modal is opened
// to properly hide your application from screenreaders and other assistive technologies
// while the modal is open

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

    const modalImage =  poster_path ? <img alt={
        `${title} ${year}`
    }
    src={src}/> : ""

    //using two variables here for the two images used in app. Inside modal and inside grid. In modal case want empty
    //so made empty string if no poser_path returned from api.
    //in case of grid, believe better to have some generic text. Api occasionally sends back null for poaster_path
    //accounting for how to handle this situation.

    return (
        <div className="movie-div">
            <h3> {title}</h3>
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
                //onRequestClose to close modal on overlay click and use of esc key.
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