import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function AdminExampTable() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExams, setSelectedExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    const selectedExamsFromStorage = JSON.parse(localStorage.getItem('selectedExams')) || [];
    setSelectedExams(selectedExamsFromStorage);
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:8888/tests');
      setExams(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exam data:', error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (id, isChecked) => {
    try {
      console.log("Changing exam status for id:", id, "to", isChecked);

      // Simulate PATCH request to update exam status
      await axios.patch(`http://localhost:8888/tests/${id}`, { examstatus: isChecked });

      const updatedExams = exams.map(exam => {
        if (exam.id === id) {
          return { ...exam, examstatus: isChecked };
        }
        return exam;
      });

      setExams(updatedExams);

      const updatedSelectedExams = isChecked
        ? [...selectedExams, id]
        : selectedExams.filter(examId => examId !== id);
      setSelectedExams(updatedSelectedExams);
      localStorage.setItem('selectedExams', JSON.stringify(updatedSelectedExams));
    } catch (error) {
      console.error('Error updating exam status:', error);
      // Optionally rollback changes on error
    }
  };

  const isSelected = (id) => {
    return selectedExams.includes(id);
  };

  const deleteRecord = (id) => {
    if (window.confirm(`Are you sure you want to delete exam with ID ${id}?`)) {
      axios.delete(`http://localhost:8888/tests/${id}`)
        .then(() => {
          window.alert("Exam deleted successfully.");
          fetchExams(); // Refresh the list of exams after deletion
        })
        .catch((error) => {
          console.error("Error deleting exam:", error);
          // Handle error, e.g., show an error message to the user
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Exam List</h2>
      <table className="table table-hover table-striped">
        <thead>
          <tr className="table-dark">
            <th>Exam ID</th>
            <th>Exam Name</th>
            <th>Select</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">Loading...</td>
            </tr>
          ) : exams.length > 0 ? (
            exams.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.examId}</td>
                <td>{exam.examName}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(exam.id, e.target.checked)}
                    checked={isSelected(exam.id)}
                  />
                </td>
                <td>
                  <Link to="/admindashboard/editquestioncomponent" variant="body2">Edit</Link>
                  {' '}
                  <button className="btn btn-outline-danger btn-sm" onClick={() => deleteRecord(exam.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No exams found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminExampTable;
