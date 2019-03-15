Vue.component('upload-form', {
    data() {
      return {
        title: '',
        artist: '',
        music: '',
      }
    },
    methods: {
      handleFileUpload() {
        this.music = this.$refs.file.files[0];
      },
  
      upload() {
        let data = new FormData()
        data.append('music', this.music)
        data.append('title', this.title)
        data.append('artist', this.artist)
        axios({
          method: 'POST',
          url: `http://localhost:3000/music`,
          data,
          headers: {
            access_token: localStorage.token,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ data }) => {
          this.title = ''
          this.artist = ''
          this.$emit('create-music', data)
          this.$emit('close-upload')
        })
        .catch(err => {
          console.log(err.response)
        })
      }
    },
    template: `
    <form @submit.prevent="upload">
      <div class="form-group">
        <label for="exampleInputEmail1">Title</label>
        <input v-model="title" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Put song title here">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Artist</label>
        <input v-model="artist" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Put artist name here">
      </div>
      <div class="form-group">
          <label for="exampleInputFile">File input</label>
          <input type="file" @change="handleFileUpload" class="mt-3" id="file" ref="file"></input>
      </div>
      <button type="submit" class="btn btn-light">Submit</button>
      <button type="button" class="btn btn-secondary" @click.prevent="$emit('close-upload')">Close</button>
    </form>
    `
  })
  