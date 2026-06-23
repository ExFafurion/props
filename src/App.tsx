import Listing from './components/Listing';
import type { Item } from './components/Listing';
import etsyData from './data/etsy.json';
import './App.css';

function isValidItem(item: any): item is Item {
  return (
    item &&
    typeof item.title === 'string' &&
    item.title.length > 0 &&
    item.MainImage &&
    typeof item.MainImage.url_570xN === 'string' &&
    item.MainImage.url_570xN.length > 0
  );
}

const validData = (etsyData as unknown as Item[]).filter(isValidItem);

function App() {
  return (
    <div className="App">
      <Listing items={validData} />
    </div>
  );
}

export default App;