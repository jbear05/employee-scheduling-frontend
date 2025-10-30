import React from 'react';
import TabNavigation from './TabNavigation'; // Your component from Step 2

function MainHeader() {
    return (
        <header className="main-header">
            {/* Top Bar Section (Blue) */}
            <div className="main-header__top-bar">
                <div className="app-branding">
                    {/* Placeholder for your logo/icon */}
                    <span className="logo-icon">📅</span>
                    <h1 className="app-title">Employee Scheduling System</h1>
                </div>
                
                <div className="header-actions">
                    <button className="btn-settings">⚙️ Settings</button>
                    <button className="btn-export">Export Schedule</button> 
                    {/* The Export Schedule button would eventually call a specific API function */}
                </div>
            </div>

            {/* Tab Navigation Section (White/Gray strip below the top bar) */}
            {/* The TabNavigation component handles the links and the active state logic */}
            <TabNavigation />
        </header>
    );
}

export default MainHeader;