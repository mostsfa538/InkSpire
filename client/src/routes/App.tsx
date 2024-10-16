import Navbar from "../components/Layout/Navbar/Navbar";
import HomePage from "../pages/HomePage";

function App() {
    return (
        <div className="flex flex-col h-full">
            <Navbar />
            <HomePage />
        </div>
    );
}

export default App;
