import './LayoutAdminStyle.css';

import { Outlet } from 'react-router-dom';
// import Dashboard from '../../components/Dashboard';
// import HeaderAdmin from '../../components/HeaderAdmin';
export default function LayoutAdmin() {


    return (
        <div>
            <h1>
                admin
            </h1>
            <Outlet />

        </div>
    )
}
