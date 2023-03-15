import logo from './diaverum-logo-primary.svg';
import './App.css';
import LabResultsTable from "./components/LabResultsTable/LabResultsTable";
import LabResultsDataSource from "./DataSources/LabResultsDataSource";

function App() {
    const dataSource = new LabResultsDataSource();
    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="Diaverum"/>
            </header>

            <main className="app-main">
                <h2>Lab Results</h2>
                <LabResultsTable dataSource={dataSource}/>
            </main>

        </div>
    );
}

export default App;
