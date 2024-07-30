import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddExamAdminComp = () => {
  const [examId, setExamId] = useState('');
  const [examName, setExamName] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const formErrors = {};
    if (!examId) {
      formErrors.examId = 'Exam ID is required.';
    }
    if (!examName) {
      formErrors.examName = 'Exam Name is required.';
    }
    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      // Prepare exam object
      const newExam = {
        examId,
        examName
      };

      try {
        // Send POST request to JSON server
        const response = await fetch('http://localhost:8888/tests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newExam),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        console.log('Exam successfully added:', newExam);

        // Reset form fields after successful submission
        setExamId('');
        setExamName('');
      } catch (error) {
        console.error('Error adding exam:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Exam Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="examId" className="form-label">Exam ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="examId"
                    value={examId}
                    onChange={(e) => setExamId(e.target.value)}
                  />
                  {errors.examId && <div className="text-danger">{errors.examId}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="examName" className="form-label">Exam Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="examName"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                  />
                  {errors.examName && <div className="text-danger">{errors.examName}</div>}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <Link to="/admindashboard/addquestion">Add Questions</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExamAdminComp;