Vue.component('song-lyric', {
    props: ['currentMusic', 'currentLyric'],
    methods: {
    },
    template:
    `<div class="lyrics-main-box d-flex border-left border-right flex-column w-60 justify-content-center"
          style="border: 1px black; overflow-y: scroll; height: 100%">
      <div class="lyrics-header p-2 text-center ">
        <img :src="currentMusic.img_url" alt="cover" class='text-center'> 
        <h1 style="text-align: center" class="mb-3">{{ currentMusic.title }}</h1>
        <h3>{{ currentMusic.artist }}</h3>
        <audio class=" mt-3" controls>
          <source :src="currentMusic.url" type="audio/ogg">
          Your browser does not support the audio tag.
        </audio>
      </div>
      <div class="get-lyrics">
        <div class="lyrics-content height-60">
          <h4  class="p-5" v-html="currentLyric" color="red"></h4>
        </div>
      </div>
    </div>
    `
})