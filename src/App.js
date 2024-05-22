import './App.css';
import { renderQuestionSubmission } from './components/QuestionSubmission';
import QuestionSubmission from './components/QuestionSubmission';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jay's Birthday Scavenger Hunt</h1>
        {renderQuestionSubmission()}
        {/* <QuestionSubmission /> */}
        {/* {renderQuestionSubmission()} */}
      </header>
    </div>
  );
}

export default App;
