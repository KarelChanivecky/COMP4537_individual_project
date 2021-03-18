import {Choice, Question} from '../../sharedSymbols/models.mjs';
import {countEmptyStrings, getCheckedRadioValue, trimEmptyStrings} from "./utils.js";
import {updateQuestion} from "./dataSource.js";

function EditBox(qRoot, getReloadFunc) {
    this.question = null;
    this.reloadFunc = getReloadFunc(qRoot, this);

    /**
     * Add question to edit box.
     * @param {Question} question
     */
    this.addQuestion = question => {
        this.question = question;
        this.showQuestion();
    };


    /**
     * Show the question in the edit box.
     */
    this.showQuestion = () => {
        for (let i = 0; i < this.question.choices.length; i++) {
            document.getElementById(`edin${i}`).value = this.question.choices[i].description;
        }
        document.getElementById('edQdescription').value = this.question.description;
        const radios = document.getElementsByName("edRadio");
        radios[this.question.correctAnswerIndex].checked = true;
    };

    /**
     * Remove question info from DOM, and set this.question to null.
     */
    this.clearQuestion = () => {
        this.question = null;
        document.getElementById("edin0").value = "";
        document.getElementById("edin1").value = "";
        document.getElementById("edin2").value = "";
        document.getElementById("edin3").value = "";
        document.getElementById('edQdescription').value = "";
    };

    /**
     * Update question in server
     */
    this.updateQuestion = () => {
        const edin0 = document.getElementById("edin0").value;
        const edin1 = document.getElementById("edin1").value;
        const edin2 = document.getElementById("edin2").value;
        const edin3 = document.getElementById("edin3").value;
        const choiceArray = [edin0, edin1, edin2, edin3];
        const qDescription = document.getElementById('edQdescription').value;
        const correctIndex = getCheckedRadioValue("edRadio");
        if (!correctIndex) {
            alert("You must select one correct answer!");
            return;
        }

        if (choiceArray[correctIndex].length === 0) {
            alert("You must select a choice that is not empty!");
            return;
        }
        if (2 < countEmptyStrings(choiceArray) ) {
            alert("You must fill in at least 2 choices!");
            return;
        }

        const [trimmedStrings, offsetCorrectIndex] = trimEmptyStrings(choiceArray, parseInt(correctIndex));

        const choices = trimmedStrings.map((str, i) => new Choice(str, i));
        const question = new Question(qDescription, choices, offsetCorrectIndex, this.question.questionId);

        updateQuestion(question)
            .then(_ => {
                this.clearQuestion();
                this.reloadFunc();
            })
            .catch(status => alert(`failed to update with status: ${status}`));
    };

    document.getElementById("edit_btn").onclick = this.updateQuestion;
}

export {EditBox};