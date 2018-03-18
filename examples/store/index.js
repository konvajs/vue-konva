import Vue from "vue";
import Vuex from "vuex";

import * as mutationTypes from "./mutation-types";

Vue.use(Vuex);

function generateTargets() {
  const NUMBER = 10;
  const targets = [];
  for (var i = 0; i < NUMBER; i++) {
    targets.push({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      isDragging: false
    });
  }
  return targets;
}

const initialState = {
  targets: generateTargets()
};

const getters = {
  targets: state => {
    return state.targets;
  }
};

const actions = {};

const mutations = {
  [mutationTypes.START_MOVE](state, { targetId }) {
    state.targets.forEach(target => {
      if (target.id === targetId) {
        target.isDragging = true;
      }
    });
  },
  [mutationTypes.STOP_MOVE](state, { targetId }) {
    state.targets.forEach(target => {
      if (target.id === targetId) {
        target.isDragging = false;
      }
    });
  },
  [mutationTypes.MOVE](state, { targetId, position }) {
    state.targets.forEach(target => {
      if (target.id === targetId) {
        target.x = position.x;
        target.y = position.y;
      }
    });
  }
};

const targetsStore = {
  state: initialState,
  getters,
  actions,
  mutations
};

export default new Vuex.Store({
  state: {},
  modules: {
    targetsStore
  },
  mutations: {},
  actions: {}
});
