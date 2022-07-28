import React, { useEffect } from 'react'
import s from './ListFilm.module.scss'
import { fetchFilms } from '../../store/thunks/filmThunks'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import ListFilmItem from './ListFilmItem/ListFilmItem'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
type Props = {}

const ListFilm = (props: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { films, filmsLoadingStatus, filmsByWordLoadingStatus } = useAppSelector(state => state.main)

    useEffect(() => {
        dispatch(fetchFilms())
        // eslint-disable-next-line
    }, [])

    const onClickHandler = (id: number) => {
        navigate(`/${id}`)
    }

    const renderFilmItems = (films: any[]) => {
        const filteredFilms = films.filter(item => item.nameRu)
        return filteredFilms.map((item, i) => {
            let color = 'white';
            if (item.ratingKinopoisk > 7 || item.rating > 7) {
                color = '#2AFF00'
            } else if (item.ratingKinopoisk > 4 || item.rating > 4) {
                color = '#FF9E00'
            } else if (item.ratingKinopoisk > 0 || item.rating > 0) {
                color = '#F55042'
            }
            return <ListFilmItem 
                color={color!} 
                src={item.posterUrl} 
                name={item.nameRu} 
                rating={item.ratingKinopoisk || item.rating} 
                key={i}
                onClick={() => onClickHandler(item.kinopoiskId || item.filmId)}/>
        })
    }
    
    const renderedItem = filmsLoadingStatus === 'loading' || filmsByWordLoadingStatus === 'loading' ? <Spinner animation='border'/> : renderFilmItems(films)
    const errorMessage = filmsLoadingStatus === 'error' || filmsByWordLoadingStatus === 'error' ? <h1>Error! Try again!</h1> : null

    return (
        <div className={s.list_film}>
            <div className={s.container}>
                {errorMessage}
                {renderedItem!}
            </div>
        </div>
        
    )
}

export default ListFilm