const baseUrl = 'http://localhost:3000/upsic'

var app = new Vue ({
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
        isLogin: false
    },
    methods: {
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
        }
    }
})