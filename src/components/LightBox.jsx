import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


class GodhanLightbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.indexElement > 0 && prevProps.indexElement !== this.props.indexElement) {
            this.setState({ photoIndex: this.props.indexElement })
        }
    }

    render() {
        const { photoIndex } = this.state;
        const {
            images,
            isLightboxOpen,
            toggleLightbox,
        } = this.props;

        return (
            <div>
                {isLightboxOpen && (
                    <>
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                            onCloseRequest={() => toggleLightbox(false)}
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + images.length - 1) % images.length,
                                })
                            }
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + 1) % images.length,
                                })
                            }
                            wrapperClassName="notch"
                        />
                    </>
                )}
            </div>
        );
    }
}
export default GodhanLightbox