const initialState = {
    
    MenuOpen: false,
    activeTab: ''
}

export default function MenuReducer(state = initialState, action) {
    switch (action.type) {
        case 'MENU_TOGGLE':
            console.log('REDUCER - MENU TOGGLE', action.menu)
            return {
                ...state,
                MenuOpen: action.MenuOpen
            }
        case 'SWITCH_TAB':
            console.log('REDUCER - SWITCH TAB', action.activeTab)
            return {
                ...state,
                activeTab: (action.activeTab)
            }
        
        default:
            return state;
    }
}