import React, { useEffect, useState } from 'react';

const ApiFetching = ({ searchParam }, { searchType }) => {
    const [dataFiles, setDataFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imgFullscreen, setImgFullscreen] = useState(null);


    useEffect(() => {    
    const api_key = '33167218-766cc9009bbf26dae43e769e3';
    const base_api = 'https://pixabay.com/api/';
    const base_video_api = 'https://pixabay.com/api/videos/';
    if(searchParam.toLowerCase() == 'csabi'){
        searchParam = 'donkey';
        console.log(searchParam);
    }

    let url ='';
    if(searchType == 'image'){
        url = `${base_api}?key=${api_key}&q=${searchParam}&image_type=photo`;
    } else {
        url = `${base_video_api}?key=${api_key}&q=${searchParam}`;
    }
    

    const fetchData = async ()=> {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setDataFiles(data.hits);
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
            {dataFiles.length > 0 ? (
                dataFiles.map((image) => (
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