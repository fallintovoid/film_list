import React from 'react'
import s from './FavouriteFilmItem.module.scss'

type Props = {
    src: string,
    name: string,
    description: string
}

const FavouriteFilmsItem = ({src, name, description}: Props) => {

    const descr = description && description.length > 200 ? description.slice(0, 200)+'...' : description
    return (
        <div className={s.favfilm}>
            <div className={s.favfilm_foto}>
                <img src={src} />
            </div>
            <div className={s.favfilm_descr}>
                <h3>
                    {name}
                </h3>
                <p>
                    {descr}
                </p>
            </div>
        </div>
    )
}

export default FavouriteFilmsItem