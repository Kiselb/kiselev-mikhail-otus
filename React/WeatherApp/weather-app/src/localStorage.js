
//https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

export const loadState = () => {
    try {
        const serializedState = window.localStorage.getItem('state_cities');
        if (serializedState === null) {
            return { cities: [] }; //undefined;
        }
        return JSON.parse(serializedState);
    } catch {
        console.log("Storage load error");
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        window.localStorage.setItem('state_cities', serializedState);
    } catch (err) {
        // Ignore errors
    }
}
