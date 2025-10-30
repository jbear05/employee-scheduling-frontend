import React, { useState, useEffect } from 'react';
import { getShifts, deleteShift } from '../services/ShiftService'; 
import ShiftListTable from '../components/shifts/ShiftListTable';
import { Link, Outlet, useLocation } from 'react-router-dom';

function ShiftManagementPage() {
    const [shifts, setShifts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define the Action: Fetching Data
    const fetchShifts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getShifts(); 
            setShifts(data);
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Failed to load shift list. Check API connection.");
        } finally {
            setIsLoading(false);
        }
    };

    // Trigger the Action using useEffect
    useEffect(() => {
        fetchShifts();
    }, []); 

    // Function to handle deletion and update the list without a full page refresh
    const handleDelete = async (id) => {
        try {
            await deleteShift(id); 
            setShifts(shifts.filter(shift => shift.id !== id));
        } catch (err) {
            console.error("Delete Error:", err);
        }
    };

    // Check the current location to decide what to show
    const location = useLocation();
    const isListPath = location.pathname.replace(/\/$/, "") === '/shifts';

    // Handle Statuses with Conditional Rendering
    if (isLoading) {
        return <div>Loading Shift Data...</div>; 
    }
    if (error) {
        return <div style={{ color: 'red', padding: '20px' }}>⚠️ Error: {error}</div>;
    }

    // Success state: Render the main component, passing data and handlers
    return (
        <div className="page-container shift-management">
            {/* RENDER THE CONTENT BASED ON THE PATH */}
            {isListPath && (
                <>
                    {/* The Add Button and List Table ONLY appear on /shifts */}
                    <Link to="/shifts/new" className="btn-action btn-primary">
                        + Add New Shift Template
                    </Link>
                    <ShiftListTable 
                        shifts={shifts} 
                        onDelete={handleDelete} 
                    />
                </>
            )}

            {/* RENDER THE NESTED FORM (from App.jsx routes) */}
            <Outlet /> 
        </div>
    );
}

export default ShiftManagementPage;