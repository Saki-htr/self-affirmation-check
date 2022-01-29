#!/usr/bin/env node
const { Quiz } = require('enquirer')
const data = require('./data.js')

class Question {
  constructor () {
    this.amount = 0
  }

  async start () {
    const firstMessage = '自己肯定感は時と場合によって高くも低くもなります。低い時は、ちょっとしたことでも大ごとに感じてしまいます。大事なのは、今、自分の自己肯定感がどれくらいの高さにあるか認識することです。\n以下の12個の質問に答えると、自分の自己肯定感の高さが分かります。Yesが10個以上の場合、あなたの自己肯定感は今、低い状態になっていると言えます。\n(このチェックリストは、「中島輝 著  『何があっても「大丈夫。」と思えるようになる 自己肯定感の教科書』」より引用しています。)\n'
    console.log(firstMessage)
    await this.ask(data)
    await this.calcAmount(data)
  }

  async answerQuestion (questionItems) {
    const prompt = new Quiz(questionItems)
    const answer = await prompt.run()
    if (answer.correct) { this.amount += 1 }
  }

  async ask (data) {
    for (let number = 0; number < data.length; number++) { await this.answerQuestion(data[number]) }
  }

  calcAmount (questionItems) {
    const yesAnswerAmount = this.amount
    console.log(`\n12個中${yesAnswerAmount}個Yesでした。`)
    if (yesAnswerAmount >= 10) {
      console.log('今のあなたは自己肯定感が低くなっています。今日は仕事や学習を早めに切り上げましょう。')
    } else {
      console.log('今のあなたは自己肯定感が高いです。が、自己肯定感は時と場合によって変動するので、定期的にチェックするようにしましょう。')
    }
  }
}

const question = new Question()
question.start()
