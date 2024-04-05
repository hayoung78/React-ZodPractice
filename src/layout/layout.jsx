import Footer from "./footer";
import Header from "./header";

const { Outlet } = require("react-router-dom");

const RootLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
export default RootLayout;
