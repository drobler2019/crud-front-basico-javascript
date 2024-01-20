import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: []
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if (users.length === 0) {
        return;
    }
    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async () => {
    if (state.currentPage === 1) {
        return;
    }
    const users = await loadUsersByPage(state.currentPage - 1);
    state.currentPage -= 1;
    state.users = users;
}

const onUserChanged = (updateUser) => {

    let wasfound = false;

    state.users = state.users.map(user => {
        if (user.id === updateUser.id) {
            wasfound = true;
            return updateUser;
        }
        return user;
    });

    if (state.users.length < 10 && !wasfound) {
        state.users.push(updateUser);
    }
}

const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage);
    if (users.length === 0) {
        await loadPreviousPage();
        return;
    }
    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage
}