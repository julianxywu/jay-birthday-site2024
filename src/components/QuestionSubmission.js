import {useEffect, useState} from 'react';

export function RenderQuestionSubmission() {

    const numOfSteps = 22;
    const steps = {
        1: ['Hello, Jeongwook', ''],
        2: ['How has your day been so far?', 'ANY'],
        3: ["You are about to embark on \na ~scavenging hunt~", ''],
        4: ['But first, let\'s make sure \nyou know how to answer questions properly.', ''],
        5: ['How old are you turning?', '24'],
        6: ['What is your favorite color?', 'ANY'],
        7: ['What is Ronald Reagan\'s middle name?', 'Wilson'],
        8: ['Tsk tsk tsk.. \ndon\'t let me catch you cheating again.', ''],
        9: ['Let\'s get started... \nhead over to East Village Pizza :)', ''],
        10: ['What’s the sum of all the \nnumbers on the East Village \npizza hanging banner?', '49'], // Q1
        11: ['Well done. \nYou can at least do addition :)', ''],
        12: ['"THIS GARDEN IS IN \nLOVING MEMORY OF ______" \n(hint: 40.725764, -73.981671)', 'DON ROBERTS'], // Q2
        13: ['Press f for Don Roberts :)', 'f'],
        14: ['Now for a fun little exercise break..', ''],
        15: ['Take a video of you \nand your current companions \nhaving a speed-walking race \nfrom 9th St to 10th Street. \nSend the video to Julian\n for the next password.', 'SpeedWalker420'], // Q3
        16: ['Wasn\'t that fun? :) \nTime for a harder question..', ''],
        17: ['Count Abe\'s benches and trees.', '15'], // Q4
        18: ['Wow, I guess you are.. kinda smart?', ''],
        19: ['Alright here\'s the last part.. \nfind a nearby deli that sells bread.', ''],
        20: ['Recreate this scene \n and send it to Julian: \n\nhttps://www.youtube.com/watch?v=4rnkr2UN5UU&ab_channel=krimola', 'IdiotSandwich'], // Q5
        21: ['Great job, Jeongwook.. :)', ''],
        22: ['Head back home. \nKnock on the door 7 times \nand say "Pickle Rick" to be let in. \nSee you soon :)', '']
    };

    const [prompt, setPrompt] = useState(steps[1][0]);
    const [answer, setAnswer] = useState(steps[1][1]);
    const [attemptedAnswer, setAttemptedAnswer] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('typing');
    const [hideTextArea, setHideTextArea] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        if (answer !== "") {
            setHideTextArea(false);
          }
          else {
            setHideTextArea(true);
          }
          setAttemptedAnswer('');
      }, [currentStep, prompt, answer]);

//   if (status === 'success') {
//     return <h1>That's right!</h1>
//   }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      console.log("attemptedAnswer:", attemptedAnswer);
      await submitForm(attemptedAnswer);

      setCurrentStep((prev) => {
        const newStep = prev + 1;
        console.log("currentStep:", newStep); // This will print the new value
        setPrompt(steps[newStep][0]);
        setAnswer(steps[newStep][1]);
        setError(null);
        console.log(steps.length)
        if (newStep === numOfSteps) {
            setStatus('success');
            } 
        else {
            setStatus('typing');
        }
        return newStep;
        });
    } catch (err) {
        setError(err);
        setStatus('typing');
    }
  }

  function handleTextareaChange(e) {
    setAttemptedAnswer(e.target.value);
  }

    function renderPrompt() {
        console.log(prompt);
        return (
            <p className="display-linebreak">
            {prompt}
            </p>
        );
    }

    function submitForm(typedAnswer) {
        // Pretend it's hitting the network.
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (answer === "" || answer === "ANY") {
                
                resolve();
            }
            let shouldError = typedAnswer.toLowerCase() !== answer.toLowerCase();
            if (shouldError) {
              reject(new Error('Try harder, ya bum.'));
            } else {
              resolve();
            }
          }, 1500);
        });
      }

  return (
    <>
      <div>
        {renderPrompt()}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={attemptedAnswer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
          hidden={hideTextArea}
        />
        <br />
        <button disabled={
          status === 'submitting'
        } hidden={status === 'success'}>
          Continue
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}