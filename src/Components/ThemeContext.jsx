import { createContext, useState, useContext } from 'react';

// Create Context
export const ThemeContext = createContext('light');

export const ThemeProvider = ({ children }) => {
    // State for theme
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);