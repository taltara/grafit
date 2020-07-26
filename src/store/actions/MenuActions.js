export function toggleMenu(MenuOpen) {
    return { type: 'MENU_TOGGLE', MenuOpen };
}

export function switchTab(activeTab) {
    return { type: 'SWITCH_TAB', activeTab };
}