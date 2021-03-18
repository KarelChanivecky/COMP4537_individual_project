import {getQuestions} from './dataSource.js';
import {AddBox} from "./addBox.js";
import {EditBox} from "./editBox.js";
import {makeAdminQuestionCard} from "./adminQuestionCard.js";


function getLoad(rootNode, editBox) {

    return () => getQuestions()
                    .then(questions => {
                        rootNode.innerHTML = "";
                        questions.forEach(question => {
                            rootNode.appendChild(makeAdminQuestionCard(question, editBox));
                        });
                    })
                    .catch(status => {
                        alert(`Could not fetch questions. status: ${status}`);
                    });

}

function main() {
    const qRoot = document.getElementById("question_root");
    const editBox = new EditBox(qRoot, getLoad)
    const load = getLoad(qRoot, editBox);
    const addBox = new AddBox(load);
    load();
}

window.onload = main;