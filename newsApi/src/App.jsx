import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import NewsApi from './contextApi/newsApi'
import HomePage from './HomePage'
import NewsMain from './news/newsMain'
import './news/styles.css'
import Sidebar from './sidebar/sidebar'
import AddArticle from './screens/article/addArticle'
import ArticleList from './screens/article/articleList'
import DisplayArticle from './screens/article/DisplayArticle';
import Search from './screens/search/Search'
import Login from './screens/login/login'
import Registration from './screens/Register/Registration'

function App() {

  const navigate = useNavigate();
  const userId = localStorage.getItem('user');
  if (!userId) {
    navigate('/login');
  }

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
              <Route path='/search' element={<Search />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Registration />} />
            </Routes>
          </div>
        </div>
      </NewsApi>
    </div >

  )
}

export default App
