import "./App.css";
import Router from "./routes/Router";

// components
import Header from "./components/common/Header";

// styled-components
import { Container } from "./App.styles";

function App() {
  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: 'center'}}>
      <Container>
        <Header />
        <Router></Router>
      </Container>
    </div>
  );
}

export default App;
