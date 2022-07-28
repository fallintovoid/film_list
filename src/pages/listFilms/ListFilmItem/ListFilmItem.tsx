import React, { MouseEvent } from 'react'
import s from './ListFilmItem.module.scss'

type Props = {
    src: string,
    name: string,
    rating: number,
    color: string,
    onClick: () => void
}
const ListFilmItem = ({src, name, rating, color, onClick}: Props) => {
  return (
    <div className={s.list_item} onClick={onClick}>
        <div className={s.list_item__foto}>
            <img src={src} alt={name}/>
            <div className={s.list_item__foto__rating} style={{border: `2px ${color} solid`}}>
                {rating}
            </div>
        </div>
        <div className={s.list_item__info}>
            {name}
        </div>
    </div>
  )
}

export default ListFilmItem