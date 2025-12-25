import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useParams, useNavigate, Routes, Route, MemoryRouter } from 'react-router-dom';
import { useTheme } from './Context';

// --- PART 1 ---
export const Part1 = () => {
    const MouseTracker = () => {
        const [coords, setCoords] = useState({ x: 0, y: 0 });
        useEffect(() => {
            const handleMouseMove = (e) => setCoords({ x: e.clientX, y: e.clientY });
            window.addEventListener('mousemove', handleMouseMove); // 
            return () => window.removeEventListener('mousemove', handleMouseMove); // 
        }, []);
        return <p><strong>Mouse:</strong> X: {coords.x}, Y: {coords.y}</p>;
    };

    return (
        <section id="part1" className="lab-section">
            <div className="section-header"><h2>Part 1: useEffect & Cleanup</h2></div>
            <div className="qa-block">
                <p className="question">Q: Primary purpose of useEffect?</p>
                <p>Sync with external systems (DOM, API) .</p>
            </div>
            <div className="demo-box">
                <h4>Exercise 1.3: MouseTracker</h4>
                <MouseTracker />
            </div>
        </section>
    );
};

// --- PART 2 ---
export const Part2 = () => {
    const usernameRef = useRef(null); // 
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Login: ${usernameRef.current.value}`); // 
    };
    return (
        <section id="part2" className="lab-section">
            <div className="section-header"><h2>Part 2: useRef</h2></div>
            <form onSubmit={handleSubmit} className="demo-box">
                <h4>Exercise 2.1: Uncontrolled Login</h4>
                <input ref={usernameRef} className="input-field" placeholder="Username..." /> {/* */}
                <button type="submit" className="btn">Login</button>
            </form>
        </section>
    );
};

// --- PART 3 ---
export const Part3 = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true); // 
        setError(null);
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            if (!res.ok) throw new Error('HTTP Error'); // 
            const result = await res.json();
            setData(result); // 
        } catch (err) {
            setError(err); // 
        } finally {
            setLoading(false); // 
        }
    };

    return (
        <section id="part3" className="lab-section">
            <div className="section-header"><h2>Part 3: Data Fetching</h2></div>
            <div className="demo-box">
                <button onClick={fetchData} className="btn">Fetch Post</button>
                {loading && <p style={{color:'orange'}}>Loading...</p>}
                {error && <p style={{color:'red'}}>Error: {error.message}</p>}
                {data && <div><h5>{data.title}</h5><p>{data.body}</p></div>}
            </div>
        </section>
    );
};

// --- PART 4 ---
export const Part4 = () => {
    const [formData, setFormData] = useState({ email: "", password: "" }); // 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value })); // 
    };
    return (
        <section id="part4" className="lab-section">
            <div className="section-header"><h2>Part 4: Forms</h2></div>
            <form onSubmit={(e) => { e.preventDefault(); console.log(formData); alert(JSON.stringify(formData)); }} className="demo-box">
                <h4>Controlled Form</h4>
                <input name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="Email" />
                <input name="password" type="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="Password" />
                <button type="submit" className="btn">Submit</button>
            </form>
        </section>
    );
};

// --- PART 5 (Router Demo) ---
// Note: In a real app, these would be separate files. Using MemoryRouter for demo inside a single page.
const Home = () => <div><h3>Home</h3><Link to="/about" className="btn">Go About</Link> <Link to="/users/99" className="btn">User 99</Link></div>;
const About = () => { const nav = useNavigate(); return <div><h3>About</h3><button onClick={() => nav('/')} className="btn">Back</button></div>; };
const User = () => { const { id } = useParams(); return <h3>User ID: {id}</h3>; }; // 

export const Part5 = () => (
    <section id="part5" className="lab-section">
        <div className="section-header"><h2>Part 5: React Router v6</h2></div>
        <div className="demo-box" style={{border: '2px dashed #3498db'}}>
            <MemoryRouter>
                <nav style={{marginBottom:10, borderBottom:'1px solid #ccc'}}>
                    <Link to="/">Home</Link> | <Link to="/about">About</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/users/:id" element={<User />} /> {/* */}
                </Routes>
            </MemoryRouter>
        </div>
    </section>
);

// --- PART 6 ---
export const Part6 = () => {
    const { theme, toggleTheme } = useTheme(); // 
    return (
        <section id="part6" className="lab-section">
            <div className="section-header"><h2>Part 6: Context API</h2></div>
            <div className={`demo-box theme-${theme}`}>
                <h4>Current Theme: {theme.toUpperCase()}</h4>
                <button onClick={toggleTheme} className="btn">Toggle Theme</button>
            </div>
        </section>
    );
};

// --- PART 7 ---
const useLocalStorage = (key, initialValue) => { // 
    const [storedValue, setStoredValue] = useState(() => {
        try { return JSON.parse(window.localStorage.getItem(key)) || initialValue; }
        catch { return initialValue; }
    });
    const setValue = (value) => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value)); // 
    };
    return [storedValue, setValue];
};

export const Part7 = () => {
    const [count, setCount] = useLocalStorage('myCounter', 0); // 
    return (
        <section id="part7" className="lab-section">
            <div className="section-header"><h2>Part 7: Custom Hooks</h2></div>
            <div className="demo-box">
                <h4>Persistent Counter</h4>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)} className="btn">Increment</button>
            </div>
        </section>
    );
};
