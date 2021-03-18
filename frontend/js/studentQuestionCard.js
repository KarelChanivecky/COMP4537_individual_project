import { Question, Choice } from '../../sharedSymbols/models.mjs';
import {renderNode, renderDiv} from './renderHTML.js';


/**
 * Manage a question in quiz.
 *
 * @param {Question} question
 * @constructor
 */
function StudentQuestionCard(question) {
    this.question = question;
    this.choice = 0;
    this.node = null;
    this.makeGreens = [];

    this.render = () => {
        const container = renderDiv(null, "with_border");
        const qDescription = renderNode("h3");
        qDescription.innerText = question.description;
        container.appendChild(qDescription);
        for (let i = 0; i < question.choices.length; i++) {
                const [node, makeGreen] = makeChoice(
                    this.question.questionId,
                    this.question.choices[i],
                    this.getOnRadioSelect(i));
                this.makeGreens.push(makeGreen);
                container.appendChild(node);
        }
        this.node = container;
    }

    this.getOnRadioSelect = radioValue => () => {
        this.choice = radioValue;
    }

    this.mark = () => {
        this.makeGreens[this.question.correctAnswerIndex]();
        return this.question.correctAnswerIndex === this.choice;
    };
}


/**
 * Make a choice DOM.
 *
 * @param {number} questionId
 * @param {Choice} choice
 * @param {function() }onSelect
 * @returns {(HTMLDivElement|(function(): string))[]}
 */
function makeChoice(questionId, choice, onSelect) {
    const container = renderDiv(null, "with_border");
    const radio = renderNode("input");
    radio.type = "radio";
    radio.name = `q${questionId}_radio`;

    radio.onclick = onSelect;

    const label = renderNode("label");
    label.innerText = choice.description;
    label.for = radio.name;

    container.appendChild(radio);
    container.appendChild(label);
    return [container, () => container.style.backgroundColor = "green"];
}


export {StudentQuestionCard};