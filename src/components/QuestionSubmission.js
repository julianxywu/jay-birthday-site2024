export function renderQuestionSubmission() {
    const container = document.createElement('div');
    return (
        <div>
            <input type="text" placeholder="Enter your question" />
            <button>Submit</button>
        </div>
    );
}