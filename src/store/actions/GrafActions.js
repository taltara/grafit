export function setData(data) {
    return { type: 'SET_DATA', data };
}
export function toggleTheme(theme) {
    return { type: 'THEME_TOGGLE', theme };
}
export function changeGrafView(grafView) {
    return { type: 'GRAF_VIEW', grafView };
}
