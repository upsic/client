Vue.component('song-list', {
    props: ['song'], 
    methods: {
        detail (song) {
            this.$emit('current-song', song)
        }
    },
    template: `
    <div class="card mt-3 mx-2" style="width: 31%; border-radius: 10%" >
        <div class="card-body">
            <h5 class="card-title text-center" style="color: black; cursor: pointer;" @click.prevent="detail(song)"> {{ song.title }} </h5>
            <img class="image card-img" :src="song.img_url" :alt="song.img_url">
            <!-- SHARE FACEBOOK -->
            <button class="btn btn-secondary mt-2 float-right" style="background-color: #efefef; border-radius: 100%"><a :href="'https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=' + song.url + '&display=popup&ref=plugin&src=share_button'"><i class="fab fa-facebook-f"></i></a></button>
        </div>
    </div>
    `
})