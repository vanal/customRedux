// Library
function createStore(reducer) {
    let state = {};
    let listeners = [];

    const getState = () => state;
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

// Exmaple Usage
// App code
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Action Creators
function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction (id) {
    return {
        type: ADD_GOAL,
        id,
    }
}

// Reducers
function todos(state = [], action) {
    switch( action.type ){
        case ADD_TODO :
            return state.concat([action.todo])
        case REMOVE_TODO :
            return state.filter((todo) => todo.id !== action.id)
        case TOGGLE_TODO :
            return state.map((todo) => todo.id !== action.id ? todo : 
                Object.assign({}, todo, { complete: !todo.complete }))
        default :
            return state                
    }
}

function goals(state = [], action) {
    switch( action.type ){
        case ADD_GOAL :
            return state.concat([action.goal])
        case REMOVE_GOAL :
            return state.filter((goal) => goal.id !== action.id)
        default :
            return state     
    }
}

function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

// Create the store
const store = createStore(app);

// Listen for changes
store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})

//Dispatch events to the store....
store.dispatch(addTodoAction({
    id: 0,
    name: 'take the kids to the park',
    complete: false,
}));

store.dispatch(addTodoAction({
    id: 1,
    name: 'attempt to lose 20kg in 3 to 12 months',
    complete: false,
}));

store.dispatch(addTodoAction({
    id: 2,
    name: 'wash the car',
    complete: false,
}));

store.dispatch(addTodoAction({
    id: 0,
    name: 'go to gym',
    complete: false,
}));