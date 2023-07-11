import React from 'react'
import { FaSun, FaRegMoon } from "react-icons/fa";
import { useTheme } from "next-themes";


const Button = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <button className="g-white bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <FaSun /> : <FaRegMoon />}
        </button>
    )
}

export default Button