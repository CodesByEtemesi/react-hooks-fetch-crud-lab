import React, { useState } from "react";

function QuestionForm({ setQuestions }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "correctIndex" ? parseInt(value) : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add question");
      }
      const data = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, data]);
      setFormData({
        prompt: "",
        answers: ["", "", "", ""],
        correctIndex: 0,
      });
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;

