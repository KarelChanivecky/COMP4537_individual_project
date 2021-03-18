import {getQuestions} from "./dataSource.js";
import {StudentQuestionCard} from "./studentQuestionCard.js";

/**
 * Load the questions
 * @param {HTMLDivElement} rootNode
 * @return {Promise<array<StudentQuestionCard>>}
 */
function load(rootNode) {
    rootNode.innerHTML = "";
    return new Promise((resolve) =>  getQuestions()
        .then(questions => {
            const studentQuestionCards = []
            questions.forEach(question => {
                const newCard = new StudentQuestionCard(question);
                studentQuestionCards.push(newCard);
                newCard.render()
                rootNode.appendChild(newCard.node);
            });
            resolve(studentQuestionCards);
        })
        .catch(status => {
            alert(`Could not fetch questions. status: ${status}`);
        }));
}

async function main() {
    const studentQuestionCards = await load(document.getElementById("quiz_root"));
    console.log(studentQuestionCards);
    document.getElementById("mark_btn").onclick = () => {
        let correct = 0;
        studentQuestionCards.forEach(studentQuestionCard => {
            if (studentQuestionCard.mark()) {
                correct++;
            }
        });
        window.alert(`Your score is ${correct}/${studentQuestionCards.length}`);
    };
}


window.onload = main;