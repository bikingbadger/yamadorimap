import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => {
        return {username: ''}
    },
    actions:  {
        setName(name) {
            this.username = name;
        }
    }

})