import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
  }),
  actions: {
    addMessage(role: string, content: string) {
      this.messages.push({ role, content });
    },
  },
});