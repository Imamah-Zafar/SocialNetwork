const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Websockets',
        user: '',
        password: '',
        posts: [],
        socket: null
    },
    methods: {
        async login() {

            if (this.validateInput()) {
                const user = await fetch(`/users/login`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.user,
                        password: this.password
                    }),
                });

                const userInfo = await user.json()
                const token = userInfo['access_token']

                const profile = await fetch(`/users/profile`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                const getProfile = await profile.json();
                const followingUsers = getProfile['body']['following']
                followingUsers.map(id => this.socket.emit('joinRoom', id))


                const feed = await fetch(`/users/feed`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });

                const getFeed = await feed.json();
                const postsInFeed = getFeed['data']['data']
                postsInFeed.map(post => this.receivedMessage(post))
            }
        },
        receivedMessage(message) {
            const post = {
                title: message.title,
                body: message.body
            }
            this.posts.push(post)
        },
        validateInput() {
            return this.user.length > 0 && this.password.length > 0
        }
    },
    created() {
        this.socket = io('http://localhost:5000')
        this.socket.emit('socketConnection')
        this.socket.on('msgToClient', (message) => {

            this.receivedMessage(message)
        })
    }
})

