import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const query = inputSearch.trim();
    setSearchTerm(query)
    if (query) {
      navigate(`/?keyword=${encodeURIComponent(query)}`);

    } else {
      navigate(`/`);
    }
  };

  return (
    <div>
      <Navbar
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        onSearch={handleSearch}
      />
      <main>
        <Outlet context={{ searchTerm, setSearchTerm, setInputSearch }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;