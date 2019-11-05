function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // ignore write errors for now
  }
}

function loadLoginState() {
  return Boolean(JSON.parse(localStorage.getItem('loginState')));
}

function saveLoginState(loginState) {
  localStorage.setItem('loginState', JSON.stringify(loginState));
}

export { loadState, saveState, loadLoginState, saveLoginState };
