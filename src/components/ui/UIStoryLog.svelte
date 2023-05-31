<script>

    import game from "stores/store-game.js"
    import TEXTS from "data/data-texts.js"
    import {slide} from "svelte/transition"
    import DisplayString from "utility/display-string/display-string.js"

    $: run = $game?.state?.run ?? 0
    $: log = $game?.state?.log ?? {}
    $: items = Object.entries(log)
        .sort((x,y) => x[1] - y[1])
        .reverse()
        .slice(0, 20)

</script>

<div class="vertical padded gapped flex story">
    {#each items as [id, time] (id)}
        <div class="entry" in:slide|local>
            {@html DisplayString.html(TEXTS[id] ?? id)}
        </div>
    {/each}
</div>
<div class="fade"></div>

<style>
    .story {
        position: absolute;
        flex-direction: column-reverse;
        top : 75vh;
        right : 1rem;
        bottom : 1rem;
        left : 1rem;
        background-color: #333333;
        overflow: hidden auto;
    }

    .fade {
        position: absolute;
        top : 75vh;
        right : 1rem;
        bottom : 1rem;
        left : 1rem;
        background: linear-gradient(to bottom, #333333, #33333300, #33333300);
        pointer-events: none;
    }

    :global(.story span.knowledge) {
        color : #CCAA00;
    }

    :global(.story span.ending) {
        color : #CC4433;
    }
</style>
