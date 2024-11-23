import "./App.css";
import Router from "./routes/Router";

import { RecoilRoot, useRecoilState } from "recoil";
// components
import Header from "./components/common/Header";

// styled-components
import { Container } from "./App.styles";
import { isModalState } from "./store/headerAtom";
import Modal from "./components/common/Modal";

function Root() {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  return (
      <div
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
      >
        <Container>
          {isModal && <Modal />}
          <Router></Router>
        </Container>
      </div>
  );
}

function App(){
  return (
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  );
}

export default App;
