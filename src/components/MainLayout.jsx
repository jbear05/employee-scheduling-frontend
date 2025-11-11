import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';

// src/components/MainLayout.jsx
function MainLayout() {
  return (
    <div className="app-container">
      <MainHeader />
      <main className="content-area">
        <Outlet /> 
      </main>
    </div>
  );
}
export default MainLayout;