import { defData } from "../../data";

const initialState = {
    
    theme: 'light',
    grafView: 'linear',
    data: defData
}

export default function GrafReducer(state = initialState, action) {
    switch (action.type) {
        case 'THEME_TOGGLE':
            // console.log('REDUCER - THEME_TOGGLE', action.theme)
            return {
                ...state,
                theme: action.theme
            }
        
        case 'GRAF_VIEW':
            // console.log('REDUCER - GRAF_VIEW', action.grafView)
            return {
                ...state,
                grafView: action.grafView
            }
        
        case 'SET_DATA':
            // console.log('REDUCER - GRAF_VIEW', action.grafView)
            return {
                ...state,
                data: action.data
            }
        
        default:
            return state;
    }
}