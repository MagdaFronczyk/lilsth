class Question {
  constructor(question, answers) {
    this.question = question
    this.answers = answers.map(answer => new Answer({
      body: "gowno",
      isCorrect: true
    }))
  }
}

class Answer {
  constructor(answer) {
    this.body = answer.body
    this.isCorrect = answer.isCorrect
  }
}

