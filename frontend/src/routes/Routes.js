import React from "react";
import { Route, Routes } from 'react-router-dom'
import Home from '../homepage/Home'



const RouterApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* Add more later */}
            <Route path="*" element={<h1>404! ERROR</h1>} />
        </Routes>
    )
}

export default RouterApp;