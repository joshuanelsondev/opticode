import "./App.scss";

function App() {
  new Def.Autocompleter.Search(
    "icd10",
    "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name",
    { tableFormat: true, valueCols: [0], colHeaders: ["Code", "Name"] }
  );
  return (
    <>
      <h1 className="welcome">Welcome to Opticode</h1>
      <input type="text" id="icd10" placeholder="Enter code or name" />
    </>
  );
}

export default App;
