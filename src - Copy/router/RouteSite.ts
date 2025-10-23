import Cart from "../Pages/Frontend/Cart/Cart"
import Checkout from "../Pages/Frontend/CheckOut/Checkout"
import Home from "../Pages/Frontend/home/index"
import Login from "../Pages/Frontend/login/Login"
import ProductCategory from "../Pages/Frontend/Product/ProductCategory/ProductCategory"
import ProductDetail from "../Pages/Frontend/Product/ProductDetail/ProductDetail"
import ChangePass from "../Pages/Frontend/profile/ChangePass"
import Manage_Order from "../Pages/Frontend/profile/Manage_Order"
import Profile from "../Pages/Frontend/profile/Profile"
// import QuanLy_Order from "../pages/fronend/profile/QuanLy_Order"
import Register from "../Pages/Frontend/register/Register"
// import ResetPassword from "../pages/fronend/resetPass/ResetPassword.jsx"
// import UserByEmail from "../pages/fronend/resetPass/UserByEmail.jsx"

const RouteSite = [
    {
        path: '/', component: Home,
    },
    {
        path: '/register', component: Register,
    },
    {
        path: '/login', component: Login,
    },
    {
        path: '/cart', component: Cart,
    },
    {
        path: '/product_detail/:id', component: ProductDetail,
    },
    // {
    //     path: '/productall', component: ProductAll,
    // },
    {
        path: '/productcategory/:slug/:id', component: ProductCategory,
    },



    {
        path: '/checkout', component: Checkout,
    },

    {
        path: '/profile', component: Profile,
    },
    {
        path: '/changePass', component: ChangePass,
    },

    {
        path: '/quanly_order', component: Manage_Order,
    },

]

export default RouteSite

