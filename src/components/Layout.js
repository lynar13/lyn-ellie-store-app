import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../App.module.css";

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
