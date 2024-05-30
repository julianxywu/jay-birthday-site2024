import './App.css';
import { RenderQuestionSubmission } from './components/QuestionSubmission';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Jay's Birthday Scavenger Hunt</h1> */}
        {RenderQuestionSubmission()}
        {/* <QuestionSubmission /> */}
        {/* {renderQuestionSubmission()} */}
      </header>
    </div>
  );
}

export default App;
