import { Question, Choice } from '../../sharedSymbols/models.mjs';
import {renderNode, renderDiv} from './renderHTML.js';

/**
 * Makes a question card
 *
 * @param {Question} question
 * @param {EditBox} editBoxRef
 * @returns {HTMLDivElement}
 */
function makeAdminQuestionCard(question, editBoxRef) {
    const container = renderDiv(null, "with_border");
    const qDescription = renderNode("h3");
    qDescription.innerText = question.description;
    container.appendChild(qDescription);
    for (let i = 0; i < question.choices.length; i++) {
        if (i === question.correctAnswerIndex) {
            container.appendChild(makeChoice(question.choices[i], true));
        } else {
            container.appendChild(makeChoice(question.choices[i], false));
        }
    }
    const editBtn = makeEditBtn();
    editBtn.onclick = ()=> editBoxRef.addQuestion(question);
    container.appendChild(editBtn);
    return container;
}


/**
 * Make a choice DOM.
 *
 * @param {Choice} choice
 * @param {boolean} correct
 * @returns {HTMLDivElement}
 */
function makeChoice(choice, correct) {
    const div = renderDiv();
    div.innerText = `${correct?"->: " : ""}${choice.description}`;
    return div;
}

function makeEditBtn() {
    const btn = renderNode("button");
    btn.innerText = "✎";
    return btn;
}

export {makeAdminQuestionCard};