import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import Footer from "../footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main style={{ flex: 0, minHeight: "50vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
