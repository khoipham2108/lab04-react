import { useEffect } from 'react';
import './index.css';
// 1. Import thêm useTheme để lấy trạng thái theme
import { ThemeProvider, useTheme } from './components/Context.jsx';
import { Part1, Part2, Part3, Part4, Part5, Part6, Part7 } from './components/Parts';

// 2. Tách nội dung chính ra một Component con (AppContent)
// Lý do: Để dùng được hook useTheme(), component này bắt buộc phải nằm BÊN TRONG thẻ <ThemeProvider>
function AppContent() {
  // Lấy giá trị theme hiện tại (light hoặc dark)
  const { theme } = useTheme();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // 3. Áp dụng class theme vào thẻ div bao ngoài cùng
    // Khi theme đổi, class sẽ đổi thành "theme-dark-bg" hoặc "theme-light-bg"
    <div className={`app-container theme-${theme}-bg`}>
      
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <h2>Lab 4 (Vite)</h2>
        <ul className="nav-links">
          <li><a href="#part1" onClick={(e) => { e.preventDefault(); scrollToSection('part1'); }}>Part 1: useEffect</a></li>
          <li><a href="#part2" onClick={(e) => { e.preventDefault(); scrollToSection('part2'); }}>Part 2: useRef</a></li>
          <li><a href="#part3" onClick={(e) => { e.preventDefault(); scrollToSection('part3'); }}>Part 3: Data Fetching</a></li>
          <li><a href="#part4" onClick={(e) => { e.preventDefault(); scrollToSection('part4'); }}>Part 4: Forms</a></li>
          <li><a href="#part5" onClick={(e) => { e.preventDefault(); scrollToSection('part5'); }}>Part 5: Router</a></li>
          <li><a href="#part6" onClick={(e) => { e.preventDefault(); scrollToSection('part6'); }}>Part 6: Context</a></li>
          <li><a href="#part7" onClick={(e) => { e.preventDefault(); scrollToSection('part7'); }}>Part 7: Custom Hooks</a></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <header style={{ marginBottom: '40px' }}>
          {/* 4. Cập nhật màu chữ tiêu đề dựa theo theme */}
          <h1 style={{ color: theme === 'dark' ? '#fff' : '#2c3e50' }}>Lab 4: Intermediate React</h1>
          <p style={{ color: theme === 'dark' ? '#ccc' : 'inherit' }}>Vite Project Version</p>
        </header>

        <Part1 />
        <Part2 />
        <Part3 />
        <Part4 />
        <Part5 />
        <Part6 />
        <Part7 />
        
        <footer style={{ marginTop: '50px', color: '#888', textAlign: 'center' }}>
          Completed using React + Vite
        </footer>
      </main>
    </div>
  );
}

// 5. Component App chính sẽ bao bọc AppContent bằng Provider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;