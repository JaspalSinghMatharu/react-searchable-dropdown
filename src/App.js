import '../src/styles/styles.css';
import SelectDropdown from './components/SelectDropdown';

const colorsData = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'cyan'];
const colorsObj = [
  {
    title: 'red',
    id: 1
  },
  {
    title: 'green',
    id: 2
  },
  {
    title: 'blue',
    id: 3
  },
  {
    title: 'yellow',
    id: 4
  },
  {
    title: 'orange',
    id: 5
  },
  {
    title: 'purple',
    id: 6
  }
]

function App() {
  return (
    <div className="wrapper">
      <div className="display-wrapper">
        <p className="display-title">Default Select Dropdown</p>
        <SelectDropdown placeholder="Colors" label="title" data={colorsObj}/>
      </div>
      <div className="display-wrapper">
        <p className="display-title">Searcahble Multiselect Select Dropdown</p>
        <SelectDropdown placeholder="Colors" multiselect={true} data={colorsData}/>
      </div>
    </div>
  );
}

export default App;
