import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

export const newsContext = React.createContext();


function NewsApi({ children }) {

    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = (async () => {
            try {
                setIsLoading(true)
                const response = await fetch('https://data-api.cryptocompare.com/news/v1/article/list?lang=EN&limit=10');
                const data = await response.json();
                setNewsData(data.Data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        })
        fetchData();
    }, [])



    return (
        <newsContext.Provider value={{ newsData, isLoading }}>
            {children}
        </newsContext.Provider>
    )
}

export default NewsApi