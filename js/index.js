const baseUrl = 'http://localhost:3000/upsic'

var app = new Vue({
    el: '#app',
    data: {
        listMusic: [],
        inputEmail: '',
        inputPassword: '',
        form_regis: true,
        form_login: false,
        button_regis: false,
        button_login: true,
        button_logout: false,
        submit_regis: true,
        submit_login: false,
        isLogin: false,
        state: '',
        currentMusic: '',
        currentLyric: '',
        currentImage: '',
        song: {},
        lyric: '',
        nyoba: ''
    },
    created() {
        if (localStorage.getItem('token')) {
            this.isLogin = true
            this.button_login = false
            this.button_logout = true
            this.button_regis = false
            this.currentLyric = ''
            this.getAllSong()
        }
        let ckeditor = document.createElement('script');
        ckeditor.setAttribute('src', "//genius.com/songs/3069235/embed.js");
        document.head.appendChild(ckeditor);
    },
    methods: {
        getAllSong() {
            axios({
                url: `http://localhost:3000/music`,
                method: 'get',
                headers : {
                    access_token : localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.listMusic = data
                })
                .catch(err => {
                    console.error(err.response)
                })
        },
        pushMusic(data) {
            this.listMusic.unshift(data)
            this.currentMusic = data
            this.state = 'lyric'
                // this.getLyric()
            this.searchSong(data.title)
        },
        getLyric() {
            this.currentLyric = 'Lyric nanti masuk sini'

        },
        displayLyric(song) {
            this.currentLyric = ''
            this.currentMusic = song
            console.log(song)
            setTimeout(() => {
                this.searchSong(song.title)
            }, 500)

            this.state = 'lyric'
        },
        getRegisForm: function() {
            this.form_login = false
            this.button_regis = false
            this.button_login = true
            this.form_regis = true
            this.inputEmail = ''
            this.inputPassword = ''
        },
        getLoginForm: function() {
            this.form_regis = false
            this.button_login = false
            this.button_regis = true
            this.form_login = true
            this.inputEmail = ''
            this.inputPassword = ''
        },
        toRegis: function() {
            let newUser = {
                email: this.inputEmail,
                password: this.inputPassword
            }

            axios
                .post(`${baseUrl}/register`, newUser)
                .then(response => {
                    this.inputEmail = ''
                    this.inputPassword = ''
                    Swal.fire({
                        type: 'success',
                        title: 'Data has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated tada'
                        }
                    })
                })
        },
        toLogin: function() {
            let User = {
                email: this.inputEmail,
                password: this.inputPassword
            }

            axios
                .post(`${baseUrl}/login`, User)
                .then(response => {
                    localStorage.setItem('token', response.data.access_token)
                    this.inputEmail = ''
                    this.inputPassword = ''
                    this.button_regis = false
                    this.button_logout = true
                    this.isLogin = true
                    this.getAllSong()
                })
                .catch(err => {
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated tada'
                        }
                    })
                })
        },
        toHome: function() {
            localStorage.clear()
            this.isLogin = false
            this.button_logout = false
            this.button_regis = true
        },
        searchSong: function(songName) {
            console.log(`songname`, songName)
            let temp = songName.toLowerCase()
            let song = {
                q: songName.toLowerCase()
            }
            console.log(songName)
            axios
                .get(`${baseUrl}/search?q=${songName}`)
                .then(response => {
                    // console.log(response.data)
                    let result = []
                    response.data.forEach(e => {
                        if (temp.toLowerCase() === e.result.title.toLowerCase()) {
                            console.log('hhhhhhhh', e)
                            result.push(e)
                        }
                    });
                    // console.log(result)
                    this.getSong(result[0].result.id)
                    this.currentImage = result[0].result.primary_artist.header_image_url
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getSong: function(songId) {
            let id = songId
            axios
                .get(`${baseUrl}/songs/${songId}`)
                .then(response => {
                    console.log(response.data.embed_content)

                    let rawContent = response.data.embed_content
                    this.currentLyric = rawContent
                    $('#lirics').append(rawContent)
                        // let rawHTML = response.data.embed_content.split(`</div>`)
                        // let realLyric = `${rawHTML[0]}</div>`
                        // let realScript = `${rawHTML[1]}`
                        // this.lyric = realLyric
                        // this.nyoba = realScript
                        // console.log(realLyric)
                        // console.log(realScript)
                        // this.lyric = response.data.embed_content
                        // console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})