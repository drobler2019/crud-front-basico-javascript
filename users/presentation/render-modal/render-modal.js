import plantillaHtml from './render-modal.html?raw';
import './render-modal.css'
import { getUserById } from '../../use-cases/get-user-by-id';
let modal = null, form = null;
let loadedUser = {};

/**
 * @param {HTMLDivElement} element
 */

export const shwoModal = async (id) => {
    loadedUser = {};
    modal?.classList.remove('hide-modal');
    if (!id) return;

    const user = await getUserById(id);
    setFormValues(user);
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}

const setFormValues = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
}

export const renderModal = (element, callback) => {
    if (modal) return;
    modal = document.createElement('div');
    modal.innerHTML = plantillaHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', ({ target }) => {
        if (target.className === 'modal-container') {
            hideModal();
        }
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        let userLike = Object.fromEntries(new FormData(this));
        if (loadedUser?.id) {
            userLike['id'] = loadedUser.id;
        }
        userLike['balance'] = +userLike['balance'];
        userLike['isActive'] = userLike['isActive'] === 'on' ? true : false;
        await callback(userLike);
        hideModal();
    });

    element.append(modal);
}