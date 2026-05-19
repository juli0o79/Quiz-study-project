import { useEffect, useReducer } from 'react';
import DateCounter from './components/DateCounter';
import Header from './components/Header';
import Main from './components/Main';

const initialState = {
  quentions: [],
  // loading, error, ready, active, finished
  staus: 'loading'
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        status: 'ready',
        questions: action.payload
      }
    case 'dataFailed':
      return { ...state, status: 'error' }
    default:
      throw new Error('Action unkown')
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch('dataFailed'))
  }, [])
  return <div className='app'>
    <Header />
    <Main>
      <p>1/15</p>
      <p>Questions</p>
    </Main>
  </div>;
}

export default App;
