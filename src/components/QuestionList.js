import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id)))
      .catch((error) => console.error("Error deleting question:", error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDelete={handleDelete} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
