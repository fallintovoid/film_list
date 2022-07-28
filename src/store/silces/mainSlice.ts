import { createSlice } from "@reduxjs/toolkit";
import { fetchFilms, fetchFilmByWord, fetchFilmById } from '../thunks/filmThunks'

interface MainState {
    films: any[],
    currentFilm: CurrentFilm,
    filmsLoadingStatus: 'idle' | 'loading' | 'error',
    filmsByWordLoadingStatus: 'idle' | 'loading' | 'error',
    currentFilmLoadingStatus: 'idle' | 'loading' | 'error',
    favouriteFilms: any[]
}

export interface CurrentFilm {
    posterUrl: string,
    nameRu: string,
    description: string,
    filmLength: string,
    genres: any[],
    year: string | number,
    countries: any[],
    kinopoiskId: number,
    liked: boolean
}

const initialState: MainState = {
    films: [],
    currentFilm: {
        posterUrl: '',
        nameRu: '',
        description: '',
        filmLength: '',
        genres: [],
        year: '',
        countries: [],
        kinopoiskId: 0,
        liked: false
    },
    filmsLoadingStatus: 'idle',
    filmsByWordLoadingStatus: 'idle',
    currentFilmLoadingStatus: 'idle',
    favouriteFilms: []
}

const filmSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        addFav: (state, action) => {
            state.favouriteFilms.push(action.payload)
        },
        removeFav: (state, action) => {
            state.favouriteFilms = state.favouriteFilms.filter(item => item.id !== action.payload)
        },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilms.pending, (state: MainState) => {
                state.filmsLoadingStatus = 'loading'
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.films = action.payload.items
                state.filmsLoadingStatus = 'idle'
                
            })
            .addCase(fetchFilms.rejected, (state) => {
                state.filmsLoadingStatus = 'error'
            }) 
            

            .addCase(fetchFilmByWord.pending, (state) => {
                state.filmsByWordLoadingStatus = 'loading'
            })
            .addCase(fetchFilmByWord.fulfilled, (state, action) => {
                state.filmsByWordLoadingStatus = 'idle'
                state.films = action.payload.films
                console.log(action.payload.films)
            })
            .addCase(fetchFilmByWord.rejected, (state) => {
                state.filmsByWordLoadingStatus = 'error'
            })


            .addCase(fetchFilmById.pending, (state) => {
                state.currentFilmLoadingStatus = 'loading'
            })
            .addCase(fetchFilmById.fulfilled, (state, action) => {
                state.currentFilmLoadingStatus = 'idle'
                state.currentFilm = action.payload
                console.log(state.currentFilm)
            })
            .addCase(fetchFilmById.rejected, (state) => {
                state.currentFilmLoadingStatus = 'error'
            })
    },
})

const { actions, reducer } = filmSlice;

export { reducer }
export const { 
    addFav,
    removeFav
} = actions