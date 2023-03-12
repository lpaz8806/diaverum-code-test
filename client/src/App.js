import logo from './diaverum-logo-primary.svg';
import './App.css';

const dataResponse = [
  {
    "clinic_no": "9003",
    "barcode": "4010000907",
    "patient_id": "650",
    "patient_name": "Benjy Odetta",
    "dob": "1984-07-04",
    "gender": "F",
    "collectiondate": "2014-11-08",
    "collectiontime": "10:00",
    "testcode": "T2511",
    "testname": "Thyrotropin",
    "result": "2.0",
    "unit": "mIU/L",
    "refrangelow": "0.40",
    "refrangehigh": "4.0",
    "note": "",
    "nonspecrefs": ""
  },
  {
    "clinic_no": "9003",
    "barcode": "4010000908",
    "patient_id": "651",
    "patient_name": "Vinnie Colaiuta",
    "dob": "1984-07-04",
    "gender": "M",
    "collectiondate": "2014-11-08",
    "collectiontime": "10:00",
    "testcode": "T2511",
    "testname": "Thyrotropin",
    "result": "2.0",
    "unit": "mIU/L",
    "refrangelow": "0.40",
    "refrangehigh": "4.0",
    "note": "",
    "nonspecrefs": "<9 Non Reactive (NR),>=9 <11 Inderterminate (I),>=11 Reactive (R)"
  },
]

const displayNames = {
  // "clinic_no": "Clinic No.",
  // "barcode": "Barcode",
  "patient_id": "Pat. ID.",
  "patient_name": "Pat. Name",
  "dob": "DOB",
  "gender": "Gen.",
  "collectiondate": "Col. Date",
  "collectiontime": "Col. Time",
  // "testcode": "Test code",
  "testname": "Test name",
  "result": "Result",
  "unit": "Unit",
  "refrangelow": "Ref. RLow",
  "refrangehigh": "Ref. RHigh",
  "note": "Note",
  "nonspecrefs": "Non Spec. Refs."
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="Diaverum" />
      </header>

      <main className="app-main">
        <h2>Test Results</h2>

        <table className="d-table">
          <thead>
          <tr>{ Object.entries(displayNames).map(([k, v]) => <th key={k}>{v}</th>) }</tr>
          </thead>
          <tbody>
          {
            dataResponse.map(item => {
              const tds = Object.keys(displayNames).map(k => <td key={k}>{item[k]}</td>)
              return <tr key={item.barcode}>{tds}</tr>
            })
          }
          </tbody>
        </table>
      </main>

    </div>
  );
}

export default App;
