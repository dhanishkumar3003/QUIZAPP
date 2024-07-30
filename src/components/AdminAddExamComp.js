import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminAddExamComp() {
  const [formData, setFormData] = useState({
    examId: '',
    questionId: '',
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    const formErrors = {};
    if (!formData.examId) {
      formErrors.examId = 'Exam ID is required.';
    }
    if (!formData.questionId) {
      formErrors.questionId = 'Question ID is required.';
    }
    if (!formData.question) {
      formErrors.question = 'Question is required.';
    }
    if (!formData.option1) {
      formErrors.option1 = 'Option 1 is required.';
    }
    if (!formData.option2) {
      formErrors.option2 = 'Option 2 is required.';
    }
    if (!formData.option3) {
      formErrors.option3 = 'Option 3 is required.';
    }
    if (!formData.option4) {
      formErrors.option4 = 'Option 4 is required.';
    }
    if (!formData.correctAnswer) {
      formErrors.correctAnswer = 'Correct answer is required.';
    }
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try {
        // Fetch the relevant exam by examId
        const response = await axios.get(`http://localhost:8888/tests?examId=${formData.examId}`);
        const exam = response.data[0];

        if (!exam) {
          alert(`Exam with ID "${formData.examId}" not found`);
          return;
        }

        // Check if the questionId already exists in the exam
        const questionExists = exam.questions?.some(q => q.questionId === formData.questionId);
        if (questionExists) {
          alert(`Question with ID "${formData.questionId}" already exists`);
          return;
        }

        // Prepare new question object
        const newQuestion = {
          questionId: formData.questionId,
          question: formData.question,
          options: [formData.option1, formData.option2, formData.option3, formData.option4],
          correctAnswer: formData.correctAnswer
        };

        // Update the questions array of the fetched exam
        const updatedExam = {
          ...exam,
          questions: [...(exam.questions || []), newQuestion]
        };

        // Send PUT request to update the exam with the new questions
        await axios.put(`http://localhost:8888/tests/${exam.id}`, updatedExam);

        // Reset form fields after successful submission
        setFormData({
          examId: '',
          questionId: '',
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctAnswer: ''
        });

        alert('Record added successfully');
      } catch (error) {
        console.error('There was an error updating the exam data!', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg rounded">
            <div className="card-header bg-primary text-white text-center">
              <h2>Quiz Form</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Enter Exam ID</label>
                  <input
                    type="text"
                    name="examId"
                    value={formData.examId}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {errors.examId && <div className="text-danger">{errors.examId}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Enter Question ID</label>
                  <input
                    type="text"
                    name="questionId"
                    value={formData.questionId}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {errors.questionId && <div className="text-danger">{errors.questionId}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Enter the Question</label>
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {errors.question && <div className="text-danger">{errors.question}</div>}
                </div>
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Option 1</label>
                    <input
                      type="text"
                      name="option1"
                      value={formData.option1}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.option1 && <div className="text-danger">{errors.option1}</div>}
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Option 2</label>
                    <input
                      type="text"
                      name="option2"
                      value={formData.option2}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.option2 && <div className="text-danger">{errors.option2}</div>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Option 3</label>
                    <input
                      type="text"
                      name="option3"
                      value={formData.option3}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.option3 && <div className="text-danger">{errors.option3}</div>}
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Option 4</label>
                    <input
                      type="text"
                      name="option4"
                      value={formData.option4}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.option4 && <div className="text-danger">{errors.option4}</div>}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Correct Answer</label>
                  <input
                    type="text"
                    name="correctAnswer"
                    value={formData.correctAnswer}
                    onChange={handleChange}
                    className="form-control"
                  />
                  {errors.correctAnswer && <div className="text-danger">{errors.correctAnswer}</div>}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddExamComp;
