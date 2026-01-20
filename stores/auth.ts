import Vue from 'vue';

interface User {
  username: string;
  avatar: string;
  role: 'student' | 'teacher';
}

export const authStore = Vue.observable({
  user: null as User | null,
  isAuthenticated: false,
});

export const authActions = {
  login(username: string) {
    authStore.user = {
      username: username,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      role: 'student',
    };
    authStore.isAuthenticated = true;
  },
  logout() {
    authStore.user = null;
    authStore.isAuthenticated = false;
  }
};
