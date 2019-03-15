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
            
            <div class="fb-share-button" :data-href="song.url" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
        </div>
    </div>
    `
})