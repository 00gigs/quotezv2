'use client'
import { useEffect,useState } from "react";

import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/UI/navbar";
import AuthContext from "@/context/AuthContext";
import getCurrentUser from "./(auth)/api/[...nextauth]/actions/getCurrentUser";

const raleway = Raleway({ subsets: ["latin"],weight:["200","300","400","500","600","700","900"] });


export default  function RootLayout({ children, }:{ children: React.ReactNode;}) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])
  return (
    <html lang="en">
      <body className={raleway.className}>
      <AuthContext>
        <Navbar user={user!}/>
        {children}
        </AuthContext>
        </body>
    </html>
  );
}

