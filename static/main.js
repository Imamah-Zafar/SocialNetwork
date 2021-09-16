const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Websockets',
        text: '',
        socket: null
    },
    methods: {
        receivedMessage(message) {

            this.text = message
        }
    },
    created() {
        this.socket = io('http://localhost:3000')
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
    }
})