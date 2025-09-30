import React from 'react'

const Results = ({ score, totalQuestionNum, restartQuiz, rewatchQuiz }) => {
  return (
    <div>
      <h2>Kết quả</h2>
      <p className='result'>Bạn trả lời đúng {score}/{totalQuestionNum} câu</p>
      <div className="resultButtonsContainer">
        <button className="result-button" onClick={rewatchQuiz}>Xem lại</button>
        <button className="result-button" onClick={restartQuiz}>Làm lại</button>
      </div>
    </div>
  )
}

export default Results