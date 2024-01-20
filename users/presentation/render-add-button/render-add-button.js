import { shwoModal } from '../render-modal/render-modal';
import './render-add-button.css'
/**
 * 
 * @param {HTMLDivElement} element 
 */

export const renderAddButton = (element) => {
    const fabButton = document.createElement('button');
    fabButton.textContent = '+';
    fabButton.classList.add('fab-button');
    element.appendChild(fabButton);
    fabButton.addEventListener('click', () => shwoModal());
}