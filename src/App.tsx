import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './shared/Header/Header';
import ListFilm from './pages/listFilms/ListFilm';
import SingleFilm from './pages/singleFilm/SingleFilm';
import FavouriteFilms from './pages/favouriteFilms/FavouriteFilms';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<ListFilm/>}/>
            <Route path='/:id' element={<SingleFilm/>}/>
            <Route path='/favourite' element={<FavouriteFilms/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
