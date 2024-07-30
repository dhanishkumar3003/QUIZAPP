import { createBrowserRouter } from "react-router-dom";
import StudentSignupcomp from "../StudentSignupComp";
import StudentLoginComp from "../StudentLoginComp";
import StudentVoucherComp from "../StudentVoucherComp";
import TeacherLoginComp from "../TeacherLoginComp";
import TeacherSignupComp from "../TeacherSignupComp";
import QuestionBank from "../ViewQuizComp";
import MaindashboardComp from "../../layouts/MaindashboardComp";
import VoucherDashboardComp from "../../crud/VoucherDashboardComp";
import VoucherUpdateComp from "../../crud/VoucherUpdateComp";
import VoucherAddComp from "../../crud/VoucherAddComp";
import ExamTable from "../ExamTablecomp";
import ExamForm from "../AddExamComp";
import FormComponent from "../DemoAddExam";
import PageNotFound from "../PageNotFound";
import EditFormComponent from "../EditQuestionComp";
import Results from "../TeacherViewResultComp";
import AdminLoginComp from "../AdminLoginComp";
import AdminSignupComp from "../AdminSinupComp";
import AdminMaindashboardComp from "../../layouts/AdminMainDashboard";
import AdminAddTeacher from "../AdminAddTeacher";
import TeachersListComp from "../TeachersListComp";
import ProtectedRoute from '../ProtectedRoute';
import AdminAddExamComp from "../AdminAddExamComp";
import AdminVoucherDashboardComp from "../../crud/AdminVoucherDashboardComp";
import AddExamAdminComp from "../AddExamAdminComp";
import AdminExampTable from "../AdminExamTableComp";

const router = createBrowserRouter([
    { path: "", element: <StudentLoginComp /> },
    { path: "studentlogin", element: <StudentLoginComp /> },
    { path: "studentsignup", element: <StudentSignupcomp /> },
    { path: "studentvoucher", element: <StudentVoucherComp /> },
    { path: "teacherlogin", element: <TeacherLoginComp /> },
    { path: "teachersignup", element: <TeacherSignupComp /> },
    { path: "adminlogin", element: <AdminLoginComp /> },
    { path: "adminsignup", element: <AdminSignupComp /> },
    
    { path: "questionbank", element: <QuestionBank /> },
    {
        path: "admindashboard", 
        element: <ProtectedRoute element={<AdminMaindashboardComp />} />, 
        children: [
            { path: 'voucheredit/:id', element: <ProtectedRoute element={<VoucherUpdateComp />} /> },
            { path: 'examtable', element: <ProtectedRoute element={<AdminExampTable />} /> },
            { path: 'addexam', element: <ProtectedRoute element={<ExamForm />} /> },
            { path: 'formcomponent', element: <ProtectedRoute element={<FormComponent />} /> },
            { path: 'editquestioncomponent', element: <ProtectedRoute element={<EditFormComponent />} /> },
            { path: 'results', element: <ProtectedRoute element={<Results />} /> },
            { path: 'teacherslist', element: <ProtectedRoute element={<TeachersListComp />} /> },
            { path: "adminaddteacher", element: <ProtectedRoute element={<AdminAddTeacher />} /> },
            { path: 'voucheradd', element: <ProtectedRoute element={<VoucherAddComp />} /> },
            { path: 'voucherdashboard', element: <ProtectedRoute element={<AdminVoucherDashboardComp />} /> },
            { path:'addquestion',element: <ProtectedRoute element={<AdminAddExamComp/>}></ProtectedRoute> },
            { path:'adminaddexam',element: <ProtectedRoute element={<AddExamAdminComp/>}></ProtectedRoute> },
        ]
    },
    {
        path: '/maindashboard', 
        element: <ProtectedRoute element={<MaindashboardComp />} />, 
        children: [
            { path: 'voucheradd', element: <ProtectedRoute element={<VoucherAddComp />} /> },
            { path: 'voucherdash', element: <ProtectedRoute element={<VoucherDashboardComp />} /> },
            { path: 'voucheredit/:id', element: <ProtectedRoute element={<VoucherUpdateComp />} /> },
            { path: 'examtable', element: <ProtectedRoute element={<ExamTable />} /> },
            { path: 'addexam', element: <ProtectedRoute element={<ExamForm />} /> },
            { path: 'formcomponent', element: <ProtectedRoute element={<FormComponent />} /> },
            { path: 'editquestioncomponent', element: <ProtectedRoute element={<EditFormComponent />} /> },
            { path: 'results', element: <ProtectedRoute element={<Results />} /> },
            { path:'addquestion',element: <ProtectedRoute element={<AdminAddExamComp/>}></ProtectedRoute> }
        ]
    },
    { path: '*', element: <PageNotFound /> }
]);

export default router;
