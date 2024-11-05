import React, { useEffect, useState } from 'react';

const ApiFetching = ({ searchParam }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imgFullscreen, setImgFullscreen] = useState(null);


    useEffect(() => {    
    const api_key = '33167218-766cc9009bbf26dae43e769e3';
    const base_api = 'https://pixabay.com/api/';
    if(searchParam.toLowerCase() == 'csabi'){
        searchParam = 'Ass';
        console.log(searchParam);
    }
    const url = `${base_api}?key=${api_key}&q=${searchParam}&image_type=photo`;

    const fetchData = async ()=> {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setImages(data.hits);
        } catch(error){
            console.error("error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    if(searchParam){
        setLoading(true);
        fetchData();
    }

    


    }, [searchParam]);

    if(loading) return <div className='loadingScreen'>Loading...</div>;

    const imgClickFunc = (imageUrl) => {
        setImgFullscreen(imageUrl);
    }

    const closeFullscreen = () => {
        setImgFullscreen(null);
    }

    return(
        <div className='imageWrapper' >
            {images.length > 0 ? (
                images.map((image) => (
                    <div  key={image.id}>
                        <img 
                            className='imageFromApi' 
                            src={image.largeImageURL} 
                            alt={image.tags} 
                            onClick={() => imgClickFunc(image.largeImageURL)}
                        />
                    </div>
                ))
            ) : (
                <div>No images found</div>
            )}
            {imgFullscreen && (
                <div className='fullscreenOverlay' onClick={closeFullscreen}>
                    <img src={imgFullscreen} alt='fullscreen' />
                </div>
            )}
        </div>
    );

};

export default ApiFetching;