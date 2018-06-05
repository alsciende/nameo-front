export const PhaseStarts = ({ commit }) => {
  commit('cards/reset');
  commit('router/change', 'start-of-turn');
};

export const TurnStarts = ({ dispatch, commit }) => {
  dispatch('timer/start', 10);
  commit('cards/next');
  commit('router/change', 'turn');
};

export const CardIsWon = ({ dispatch, commit, getters }) => {
  commit('cards/success');
  commit('cards/next');
  if (getters['cards/current'] === undefined) {
    dispatch('DrawIsEmpty');
  }
};

export const CardIsLost = ({ dispatch, commit, getters }) => {
  commit('cards/failure');
  commit('cards/next');
  if (getters['cards/current'] === undefined) {
    dispatch('DrawIsEmpty');
  }
};

export const DrawIsEmpty = ({ commit }) => {
  commit('timer/clear');
  commit('router/change', 'end-of-turn');
};

export const TimeIsOut = ({ commit }) => {
  commit('timer/clear');
  commit('cards/failure');
  commit('cards/next');
  commit('router/change', 'end-of-turn');
};

export const TurnEnds = ({ getters, commit }) => {
  commit('timer/clear');
  commit('cards/clear', 'won');
  commit('cards/shuffleInto', { from: 'lost', to: 'draw' });
  if (getters['cards/drawCount'] === 0) {
    commit('router/change', 'end-of-phase');
  } else {
    commit('router/change', 'start-of-turn');
  }
};

export const PhaseEnds = ({ commit }) => {
  commit('router/change', 'start-of-phase');
};