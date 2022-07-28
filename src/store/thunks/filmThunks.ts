import { createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/useHttp";

export const fetchFilms = createAsyncThunk(
    'films/fetchFilms',
    () => {
        const { request } = useHttp();
        return request(
            'https://kinopoiskapiunofficial.tech/api/v2.2/films?type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1', 
            'GET', 
            null, 
            {
                'Content-Type': 'application/json',
                'X-API-KEY': 'd7c7e7f7-e88a-4f9b-be09-45d7be973136'
            }
        )
    }
)

export const fetchFilmByWord = createAsyncThunk(
    'films/fetchFilmsByWord',
    (name: string) => {
        const { request } = useHttp();
        return request(
            `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${name}&page=1`, 
            'GET', 
            null, 
            {
                'Content-Type': 'application/json',
                'X-API-KEY': 'd7c7e7f7-e88a-4f9b-be09-45d7be973136'
            }
        )
    }
)

export const fetchFilmById = createAsyncThunk(
    'films/fetchFilmsById',
    (id: string) => {
        const { request } = useHttp();
        return request(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, 
            'GET', 
            null, 
            {
                'Content-Type': 'application/json',
                'X-API-KEY': 'd7c7e7f7-e88a-4f9b-be09-45d7be973136'
            }
        )
    }
)