import usersStore from '../../store/users-store';
import { deleteUser } from '../../use-cases/delete-user-by-id';
import { shwoModal } from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `<tr>
    <th>#ID</th>
    <th>Balance</th>
    <th>FirstName</th>
    <th>LastName</th>
    <th>Active</th>
    <th>Actions</th>
    </tr>`;
    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);
    return table;
}

/**
 * 
 * @param {MouseEvent} event 
 */

const tableSelectListener = ({ target }) => {

    const element = target.closest('.select-user');

    if (!element) return;

    const id = element.getAttribute('data-id');
    shwoModal(id);

}

const tableDeleteListener = async ({ target }) => {

    const element = target.closest('.delete-user');

    if (!element) return;

    const id = element.getAttribute('data-id');

    try {
        await deleteUser(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').textContent = usersStore.getCurrentPage();
        renderTable();
    } catch (error) {
        alert('no se pudo eliminar el usuario');
    }

}

export const renderTable = (element) => {
    const users = usersStore.getUsers();
    if (!table) {
        table = createTable();
        element.appendChild(table);
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }
    let tableHtml = '';
    users.forEach(user => {
        tableHtml +=
            `<tr class="${user.isActive ? "active" : "no-active"}">
        <th>${user.id}</th>
        <th>${user.balance}</th>
        <th>${user.firstName}</th>
        <th>${user.lastName}</th>
        <th>${user.isActive}</th>
        <th><a href="#/" class="select-user" data-id="${user.id}">Select</a>
        <a href="#/" class="delete-user" data-id="${user.id}">delete</a></th>
        </tr>`;
    })
    table.lastElementChild.innerHTML = tableHtml;
}