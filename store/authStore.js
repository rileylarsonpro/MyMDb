import { Store } from 'pullstate';


const authStore = new Store({
    user: {
        id: "1",
        name: "John Doe",
    },
    loggedIn: false,
})

export default authStore;