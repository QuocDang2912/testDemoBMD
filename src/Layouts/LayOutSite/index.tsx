import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from "react-scroll-to-top";
import Menu from '../../Pages/Frontend/home/Menu';
import { ToastContainer } from "react-toastify";

export default function LayOutSite() {

    return (
        <div style={{ backgroundColor: "white" }}>
            <Header />
            <Menu />
            <Outlet />
            <ScrollToTop style={{ display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', right: 30, bottom: 86, backgroundColor: "#42A5F5" }} smooth top={200} />
            <Footer />
             <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}
