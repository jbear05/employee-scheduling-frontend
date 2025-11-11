import { Link, useLocation } from 'react-router-dom';

function TabNavigation() {
  // Get the current URL pathname
  const location = useLocation(); 

  const getClassName = (path) => {
    // Check if the current path starts with the link's path 
    // This handles nested routes (/employees/new still makes /employees active)
    return location.pathname.startsWith(path) 
      ? 'tab-active-style' // CSS class for the blue line/text
      : 'tab-default-style'; // default CSS class
  };

  return (
    <nav className="tab-bar">
      <Link to="/schedule" className={getClassName('/schedule')}>
        Schedule
      </Link>
      <Link to="/employees" className={getClassName('/employees')}>
        Employees
      </Link>
      <Link to="/shifts" className={getClassName('/shifts')}>
        Shifts
      </Link>
    </nav>
  );
}
export default TabNavigation;