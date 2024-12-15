import { Route, Routes } from 'react-router-dom'
import './App.css'
import NewsApi from './contextApi/newsApi'
import HomePage from './HomePage'
import NewsMain from './news/newsMain'
import './news/styles.css'
import Sidebar from './sidebar/sidebar'
import AddArticle from './article/addArticle'
import ArticleList from './article/articleList'
import DisplayArticle from './article/DisplayArticle';

function App() {

  return (
    <div className='app'>
      <NewsApi>
        <div className='sidebar-wrapper'>
          <Sidebar />
        </div>
        <div className='main-wrapper'>

          <div className='routes-wrapper'>
            <Routes>
              <Route path="/newsArticle" element={<NewsMain />} />
              <Route path="/addArticle" element={<AddArticle />} />
              <Route path="/listArticle" element={<ArticleList />} />
              <Route path="/dispArticle/:articleId" element={<DisplayArticle />} />
            </Routes>
          </div>
        </div>
      </NewsApi>
    </div >

  )
}

export default App
