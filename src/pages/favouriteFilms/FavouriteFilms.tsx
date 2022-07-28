import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import FavouriteFilmsItem from './FavouriteFilmItem/FavouriteFilmsItem'

import s from './FavouriteFilms.module.scss'

type Props = {}

const FavouriteFilms = (props: Props) => {

    const dispatch = useAppDispatch()
    const { favouriteFilms } = useAppSelector(state => state.main)

    const renderItems = (array: any[]) => {
        return array.map(item => {
            return (
                <FavouriteFilmsItem 
                    src={item.src} 
                    name={item.name}
                    description={item.description}/>
            )
        })
    }

    return (
        <div className={s.favourite_film}>
            <div className={s.container}>
                {renderItems(favouriteFilms)}
            </div>
        </div>
    )
}

export default FavouriteFilms