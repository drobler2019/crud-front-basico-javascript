import { renderTable } from "../render-table/render-table";
import usersStore from "./../../store/users-store";
/**
 * 
 * @param {HTMLDivElement} element 
 */

export const renderButtons = (element) => {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next >';
    const prevButton = document.createElement('button');
    prevButton.textContent = '< Prev';
    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerHTML = usersStore.getCurrentPage();
    element.append(prevButton, currentPageLabel, nextButton);
    
    nextButton.addEventListener('click', async () => {
        await usersStore.loadNextPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        renderTable(element);
    });

    prevButton.addEventListener('click', async () => {
        await usersStore.loadPreviousPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        renderTable(element);
    });
}