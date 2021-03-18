/**
 * Represents a question.
 *
 * @param {string} description
 * @param {array<Choice>} choices
 * @param {number} correctAnswerIndex
 * @param {number} questionId
 * @constructor
 */
function Question(description, choices, correctAnswerIndex, questionId) {
    this.description = description;
    this.choices = choices;
    this.correctAnswerIndex = correctAnswerIndex;
    this.questionId = questionId ?? null;
}

/**
 * Represents a choice.
 *
 * @param {string} description
 * @param {number} choiceId
 * @constructor
 */
function Choice(description, choiceId) {
    this.description = description;
    this.choiceId = choiceId ?? null;
}


export {Question, Choice};
