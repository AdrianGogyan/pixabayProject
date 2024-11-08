import React, { useEffect, useState } from "react";

const ApiFetching = ({ searchParam, searchType }) => {
    const [dataFiles, setDataFiles] = useState([]);
    const [isSearchImage, setIsSearchImage] = useState(true);
    const [loading, setLoading] = useState(true);
    const [imgFullscreen, setImgFullscreen] = useState(null);

    useEffect(() => {
        const api_key = "33167218-766cc9009bbf26dae43e769e3";
        const base_api = "https://pixabay.com/api/";
        const base_video_api = "https://pixabay.com/api/videos/";

        let adjustedSearchParam = searchParam;
        if (adjustedSearchParam.toLowerCase() === "csabi") {
            adjustedSearchParam = "donkey";
        }

        let url = "";
        if (searchType === "image") {
            setIsSearchImage(true);
            url = `${base_api}?key=${api_key}&q=${adjustedSearchParam}&image_type=photo`;
        } else {
            setIsSearchImage(false);
            url = `${base_video_api}?key=${api_key}&q=${adjustedSearchParam}`;
        }

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setDataFiles(data.hits || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (searchParam) {
            setLoading(true);
            fetchData();
        }
    }, [searchParam, searchType]);

    if (loading) return <div className="loadingScreen">Loading...</div>;

    const imgClickFunc = (url) => {
        setImgFullscreen(url);
    };

    const closeFullscreen = () => {
        setImgFullscreen(null);
    };

    return (
        <div>
          {imgFullscreen == null ? (
            <div className="imageWrapper">
            {dataFiles.length > 0 ? (
                dataFiles.map((item) => (
                    <div key={item.id} className="imageItem">
                        {isSearchImage ? (
                            <img
                                className="imageFromApi"
                                src={item.webformatURL}
                                alt={item.tags}
                                onClick={() =>
                                    imgClickFunc(item.largeImageURL)
                                }
                            />
                        ) : (
                            <img
                                className="imageFromApi"
                                src={item.videos?.medium?.thumbnail || ""}
                                alt={item.tags}
                                onClick={() =>
                                    imgClickFunc(item.videos.medium.url)
                                }
                            />
                        )}
                    </div>
                ))
            ) : (
                <div>No results found</div>
            )}
        </div>
          ) : (
            <div className="fullscreenOverlay" onClick={closeFullscreen}>
            {isSearchImage ? (
                <img src={imgFullscreen} alt="Fullscreen" />
            ) : (
                <video controls autoPlay style={{ width: "80vw" }}>
                    <source src={imgFullscreen} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
          )}

        </div>
    );
};

export default ApiFetching;
