// src/App.jsx (Revised)
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ScheduleCalendarPage from './pages/ScheduleCalendarPage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import ShiftManagementPage from './pages/ShiftManagementPage';
// --- New Imports (needed for nested routes) ---
import EmployeeForm from './components/employees/EmployeeForm'; 
import ShiftForm from './components/shifts/ShiftForm'; 
// ---------------------------------------------
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/schedule" replace />} />
                <Route path="schedule" element={<ScheduleCalendarPage />} />
                
                <Route path="employees" element={<EmployeeManagementPage />}>
                    <Route index element={null} /> 
                    <Route path="new" element={<EmployeeForm />} /> 
                    <Route path="edit/:id" element={<EmployeeForm />} />
                </Route>

                <Route path="shifts" element={<ShiftManagementPage />}>
                    <Route index element={null} /> 
                    <Route path="new" element={<ShiftForm />} />
                    <Route path="edit/:id" element={<ShiftForm />} />
                </Route>

                <Route path="*" element={<h2>404: Page Not Found</h2>} />
            </Route>
        </Routes>
    );
}
export default App;