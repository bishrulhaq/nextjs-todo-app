import { useState, useEffect } from 'react'
import { FaSun, FaRegMoon } from "react-icons/fa";
import { useTheme } from "next-themes";


const DarkModeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    const icon = theme === "dark" ? <FaSun /> : <FaRegMoon />;

    return (
        <button className="g-white bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center" onClick={toggleTheme}>
            {icon}
        </button>
    )
}

export default DarkModeSwitcher