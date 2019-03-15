Vue.component('song-lyric', {
    props: ['currentMusic', 'currentLyric'],
    methods: {
    },
    template:
    `<div class="lyrics-main-box d-flex border-left border-right flex-column w-60 justify-content-center"
          style="border: 1px black; overflow-y: scroll; height: 100%">
      <div class="lyrics-header p-2 ">
        <h1 style="text-align: center" class="mb-3">{{ currentMusic.title }}</h1>
        <h3>{{ currentMusic.artist }}</h3>
        <audio class="ml-5 mt-3" controls>
          <source :src="currentMusic.url" type="audio/ogg">
          Your browser does not support the audio tag.
        </audio>
      </div>
      <div class="get-lyrics">
        <div class="lyrics-content height-60">
          <h6 v-html="currentLyric" class="p-5">
          </h6>
        </div>
      </div>
    </div>
    `
  });