import { defineStore } from "pinia"

export const useUserStore = defineStore('userStore', {
    state: () => ({
        name: '',
    }),
    actions: {
        setName(name) {
            this.name = name
        }
    },
    getters: {}
})