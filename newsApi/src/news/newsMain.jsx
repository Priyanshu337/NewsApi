
import React, { useContext } from 'react'
import { newsContext } from '../contextApi/newsApi';
import NewsHead from './newsHead';
import Newsdescription from './newsdescription';
import NewsTitle from './newsTitle';
import NewsImg from './newsImg';
import NewsCategory from './newsCategory';
import './styles.css'

function NewsMain() {
    const { newsData, isLoading } = useContext(newsContext);
    console.log(isLoading, newsData);

    if (isLoading) {
        return (<p>Loading...</p>);
    }

    if (newsData.length > 0) {
        return (
            <div className='newsMain'>
                <h2>Latest News on Crypto Currencies</h2>
                {newsData.map((news, i) => (
                    <React.Fragment key={i}>
                        <div className="tab">
                            <div className="img_Container">
                                <NewsImg data={news.IMAGE_URL} />
                            </div>
                            <div className='other_Container'>
                                <NewsTitle data={news.SOURCE_DATA.NAME} />
                                <NewsHead data={news.TITLE} />
                                <Newsdescription data={news.BODY} />
                                <NewsCategory data={news.CATEGORY_DATA} />
                                < hr />
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    }
}

export default NewsMain;