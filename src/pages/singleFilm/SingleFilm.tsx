import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { CurrentFilm, addFav, removeFav } from '../../store/silces/mainSlice'
import { fetchFilmById } from '../../store/thunks/filmThunks'
import { AiFillHeart } from 'react-icons/ai'


import s from './SingleFilm.module.scss'

interface ViewProps {
    currentFilm: CurrentFilm,
    addFavourite: (id: number, src: string, description: string, name: string) => void,
    counter: boolean,
}

const SingleFilm = () => {

    const [heartCounter, setHeartCounter] = useState(false)
    const dispatch = useAppDispatch();
    const { id } = useParams()
    const { currentFilm, currentFilmLoadingStatus } = useAppSelector(state => state.main)

    useEffect(() => {
        dispatch(fetchFilmById(id!))
    }, [])

    const addFavourite = (id: number, src: string, description: string, name: string) => {
        if (!heartCounter) {
            setHeartCounter(true)
            const newFav = {
                id,
                src,
                description,
                name
            }
            dispatch(addFav(newFav))
            console.log(newFav)
        } else {
            dispatch(removeFav(id))
            setHeartCounter(false)
        }
        
    }

    const renderedItems = currentFilmLoadingStatus === 'loading' ? <Spinner animation='border'/> : <View currentFilm={currentFilm} addFavourite={addFavourite} counter={heartCounter}/>

    return (
        <div className={s.single_film}>
            {renderedItems}
        </div>
    )
}


const View = ({currentFilm, addFavourite, counter}: ViewProps) => {
    return (
        <div className={s.container}>
            <div className={s.single_film__foto}>
                <img src={currentFilm.posterUrl}/>
            </div>
            <div className={s.single_film__main}>
                <h1>
                    {currentFilm.nameRu}  
                </h1>
                <AiFillHeart 
                        color={counter ? '#FF3434' : '#7B7575' }
                        size='50px'
                        onClick={() => {
                            addFavourite(
                                currentFilm.kinopoiskId, 
                                currentFilm.posterUrl, 
                                currentFilm.description!,
                                currentFilm.nameRu)
                        }}/>
                <div className={s.single_film__main__about}>
                    <h4>О фильме</h4>
                    <ul className={s.single_film__main__about__list}>
                        <li className={s.single_film__main__about__list__item}>
                            Год - {currentFilm.year}
                        </li>
                        <li className={s.single_film__main__about__list__item}>
                            Страна(-ы) - {currentFilm.countries.map(item => item.country).join(',')}
                        </li>
                        <li className={s.single_film__main__about__list__item}>
                            Жанры - {currentFilm.genres.map(item => item.genre).join(', ')}
                        </li>
                        <li className={s.single_film__main__about__list__item}>
                            Длина - {currentFilm.filmLength} мин.
                        </li>
                    </ul>
                    <h4>Описание</h4>
                    <div className={s.single_film__main__about__description}>
                        {currentFilm.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleFilm