import NavBar from "./components/navBar";
import { DataProvider } from "./context/dataContext";
import { AggregateProvider } from "./context/aggregateContext";
import { OrderingProvider } from "./context/orderingContext";

function App() {
  return (
    <DataProvider>
      <AggregateProvider>
        <OrderingProvider>
          <NavBar />
        </OrderingProvider>
      </AggregateProvider>
    </DataProvider>
  );
}

export default App;
