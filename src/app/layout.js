"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import MobileFooterBar from "./MobileFooterBar/MobileFooterBar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
        <MobileFooterBar />
        </Provider>
      </body>
    </html>
  );
}
