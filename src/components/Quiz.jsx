import React, { useEffect, useState } from 'react'
import Results from './Results';

const quizData = [
  {
    question: "Biến nào sau đây là hợp lệ trong JavaScript?",
    options: ["1variable", "_variable", "var-name", "var name"],
    answer: "_variable",
  },
  {
    question:
      "Trong JavaScript, kiểu dữ liệu nào sau đây là kiểu dữ liệu nguyên thủy (primitive)?",
    options: ["object", "array", "string", "function"],
    answer: "string",
  },
  {
    question:
      "Thuật toán sắp xếp nào sau đây có độ phức tạp trung bình là O(n log n)?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Linear Sort"],
    answer: "Merge Sort",
  },
  {
    question: "Kết quả của `typeof null` trong JavaScript là gì?",
    options: ["'null'", "'undefined'", "'object'", "'number'"],
    answer: "'object'",
  },
  {
    question: "Bộ nhớ Stack dùng để làm gì?",
    options: [
      "Lưu trữ dữ liệu dạng hàng đợi",
      "Lưu trữ các lời gọi hàm (function calls)",
      "Lưu ảnh",
      "Lưu video",
    ],
    answer: "Lưu trữ các lời gọi hàm (function calls)",
  },
  {
    question: "Toán tử nào so sánh nghiêm ngặt giá trị và kiểu dữ liệu?",
    options: ["==", "===", "!=", "="],
    answer: "===",
  },
  {
    question: "JSON là viết tắt của gì?",
    options: [
      "Java Syntax Object Notation",
      "JavaScript Object Notation",
      "JavaScript Online Network",
      "Java Server Object Notation",
    ],
    answer: "JavaScript Object Notation",
  },
  {
    question:
      "Cấu trúc dữ liệu nào hoạt động theo nguyên tắc FIFO (First In First Out)?",
    options: ["Stack", "Queue", "Array", "Linked List"],
    answer: "Queue",
  },
  {
    question: "Câu lệnh nào in ra nội dung trong console trình duyệt?",
    options: ["print()", "console.log()", "echo()", "show()"],
    answer: "console.log()",
  },
  {
    question: "Khi bạn viết `let x;` trong JavaScript, giá trị ban đầu của x là gì?",
    options: ["null", "0", "undefined", "false"],
    answer: "undefined",
  },
  {
    question: "HTML là gì?",
    options: [
      "Ngôn ngữ lập trình để xử lý logic",
      "Ngôn ngữ đánh dấu để tạo cấu trúc website",
      "Framework của JavaScript",
      "Trình duyệt web",
    ],
    answer: "Ngôn ngữ đánh dấu để tạo cấu trúc website",
  },
  {
    question: "Trong thuật toán, Big O dùng để đo gì?",
    options: [
      "Tốc độ mạng",
      "Thời gian load ảnh",
      "Độ phức tạp của thuật toán",
      "Dung lượng RAM máy tính",
    ],
    answer: "Độ phức tạp của thuật toán",
  },
];
const Quiz = () => {

  const [optionSelected, setOptionSelected] = useState("");

  const [userAnswers, setUserAnswers] = useState(Array.from({ length: quizData.length }));//tạo ra mảng có độ dài là length

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isQuizEnded, setIsQuizEnded] = useState(false);

  const [score, setScore] = useState(0);

  const handleSelectedOption = (option, index) => {

    if (option === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    setOptionSelected(option);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = index;
    setUserAnswers(newUserAnswers);
  }

  const goNext = () => {
    if (currentQuestion === quizData.length - 1) {
      setIsQuizEnded(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  }
  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
    setOptionSelected("");
    setScore(0);
    setUserAnswers(Array.from({ length: quizData.length }));
  }

  const rewatchQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
  }

  useEffect(() => {
    const answer = Number(userAnswers[currentQuestion]);//lấy đáp án 0 1 2 3
    const pastOptionSelected = quizData[currentQuestion].options[answer];

    if (answer !== undefined) { //nếu đã được trả lời thì set lại đáp án,phục vụ cho việc tiến lên ,lùi lại vẫn show câu trả lời
      setOptionSelected(pastOptionSelected);
    } else {
      setOptionSelected("");
    }
  }, [currentQuestion, userAnswers]);


  if (isQuizEnded) {
    return (
      <Results
        score={score}
        totalQuestionNum={quizData.length}
        restartQuiz={restartQuiz}
        rewatchQuiz={rewatchQuiz}
      />
    )
  }

  return (
    <div>
      <h2>Câu {currentQuestion + 1}</h2>
      <p className='question'>{quizData[currentQuestion].question}</p>
      {quizData[currentQuestion].options.map((option, index) => (
        <button
          key={option}
          className={`option ${optionSelected === option ? "selected" : ""}`}
          disabled={!!optionSelected && optionSelected !== option}
          // disabled={optionSelected !== "" && optionSelected !== option}
          onClick={() => handleSelectedOption(option, index)}
        >
          {option}
        </button>
      ))}

      {
        optionSelected ? (optionSelected === quizData[currentQuestion].answer ? (
          <p className='correct-answer'>Câu trả lời của bạn chính xác</p>
        ) : (
          <p className='incorrect-answer'>Câu trả lời của bạn chưa chính xác</p>
        )) : ("")
      }

      <p>Câu trả lời của bạn: {optionSelected}</p>

      <div className='nav-buttons'>
        <button onClick={goBack} disabled={currentQuestion === 0}>Quay lại</button>
        <button onClick={goNext} disabled={!optionSelected}>
          {currentQuestion === quizData.length - 1 ? "Hoàn thành Quiz" : "Kế tiếp"}
        </button>
      </div>
    </div>
  )
}

export default Quiz