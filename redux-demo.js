const redux = require('redux')

const counterReducer = (state = { counter : 0},action) => {
  if(action.type==='INCREMENTBY2'){
    return {
        counter:state.counter + 2
    };
}
if(action.type==='DECREMENTBY2'){
    return {
        counter:state.counter-2
    }
}

  return state;

};

const store = redux.createStore(counterReducer);


const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
  };

  store.subscribe(counterSubscriber);
  
  store.dispatch({ type:'INCREMENTBY2' })
  store.dispatch({type:'DECREMENTBY2'})