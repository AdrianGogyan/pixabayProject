import React, { useEffect, useState } from 'react';

const ApiFetching = ({ searchParam }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {    
    const api_key = '33167218-766cc9009bbf26dae43e769e3';
    const base_api = 'https://pixabay.com/api/';
    if(searchParam == 'csabi' || 'Csabi'){
        searchParam = 'ass';
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

    if(loading) return <div>Loading...</div>;

    return(
        <div className='imageWrapper' >
            {images.length > 0 ? (
                images.map((image) => (
                    <div  key={image.id}>
                        <img className='imageFromApi' src={image.largeImageURL} alt={image.tags} />
                    </div>
                ))
            ) : (
                <div> No images found</div>
            )
        
        }
        </div>
    );

};

export default ApiFetching;