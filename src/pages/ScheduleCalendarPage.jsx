import React, { useState, useEffect } from 'react';
import { getAssignments } from '../services/AssignmentService'; 
import { getEmployees } from '../services/EmployeeService';
import { getShifts } from '../services/ShiftService'; 
import * as DateHelpers from '../utils/dateHelpers';
import ScheduleHeader from '../components/schedule/ScheduleHeader';
import CalendarGrid from '../components/schedule/CalendarGrid';

function ScheduleCalendarPage() {
    // 1. Define all necessary states
    const [assignments, setAssignments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [shifts, setShifts] = useState([]);
    
    // State to manage the currently viewed week (dynamic dependency)
    const [currentWeekStart, setCurrentWeekStart] = useState(DateHelpers.startOfWeek(new Date()));
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to handle the arrows on UI
    const handleWeekChange = (direction) => {
        let newDate;
        if (direction === 'prev') {
            newDate = DateHelpers.getPreviousWeek(currentWeekStart);
        } else if (direction === 'next') {
            newDate = DateHelpers.getNextWeek(currentWeekStart);
        } else { // Handle 'Today' button
            newDate = DateHelpers.startOfWeek(new Date());
        }
        
        setCurrentWeekStart(newDate);
    };
    
    // 2. Define the Action: Fetching ALL Data
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Calculate the week end date
            const weekEnd = DateHelpers.endOfWeek(currentWeekStart);
            
            // Fetch assignments for the current week using the dynamic date parameter
            const [assignmentData, employeeData, shiftData] = await Promise.all([
                getAssignments({ 
                    startDate: currentWeekStart, 
                    endDate: weekEnd 
                }), 
                getEmployees(),
                getShifts()
            ]);
            
            setAssignments(assignmentData);
            setEmployees(employeeData);
            setShifts(shiftData);
        } catch (err) {
            console.error("Schedule Fetch Error:", err);
            setError("Failed to load full schedule data.");
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Trigger the Action (Key difference from other pages)
    useEffect(() => {
        fetchData();
    }, [currentWeekStart]); // Runs on mount AND whenever the week changes

    // 4. Conditional Rendering for Loading/Error
    if (isLoading) {
        return <div>Loading Schedule...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', padding: '20px' }}>⚠️ Error: {error}</div>;
    }

    return (
        <div className="page-container schedule-view">
            
            {/* 1. HEADER CONTROLS: Manages the date state */}
            <ScheduleHeader 
                currentWeekStart={currentWeekStart}
                handleWeekChange={handleWeekChange}
            />

            {/* 2. MAIN GRID: Renders the 7 columns */}
            <CalendarGrid 
                currentWeekStart={currentWeekStart}
                assignments={assignments} 
                employees={employees}
                shifts={shifts}
            />
        </div>
    );
}

export default ScheduleCalendarPage;