import { Question, Choice } from '../../sharedSymbols/models.mjs';
import {countEmptyStrings, getCheckedRadioValue, trimEmptyStrings} from "./utils.js";
import {sendQuestion} from "./dataSource.js";


function AddBox(reloadFunc) {
    this.reloadFunc = reloadFunc;
    this.clearQuestion = () => {


        document.getElementById("addin0").value = "";
        document.getElementById("addin1").value = "";
        document.getElementById("addin2").value = "";
        document.getElementById("addin3").value = "";
        document.getElementById('addQdescription').value = "";
    }
    this.addQuestion = () => {

        const addin0 = document.getElementById("addin0").value;
        const addin1 = document.getElementById("addin1").value;
        const addin2 = document.getElementById("addin2").value;
        const addin3 = document.getElementById("addin3").value;
        const choiceArray = [addin0, addin1, addin2, addin3];
        const qDescription = document.getElementById('addQdescription').value;
        const correctIndex = getCheckedRadioValue("addRadio");
        if (!correctIndex) {
            alert("You must select one correct answer!");
            return;
        }
        if (2 < countEmptyStrings(choiceArray) ) {
            alert("You must fill in at least 2 choices!");
            return;
        }
        const [trimmedStrings, offsetCorrectIndex] = trimEmptyStrings(choiceArray, parseInt(correctIndex));

        const choices = trimmedStrings.map((str, i) => new Choice(str, i));

        const question = new Question(qDescription, choices, offsetCorrectIndex, 0);
        sendQuestion(question)
            .then(_ => {
                this.clearQuestion();
                this.reloadFunc();
            })
            .catch(status=>alert(`failed to send with status: ${status}`));

    };
    document.getElementById("add_btn").onclick = this.addQuestion;
}

export {AddBox};