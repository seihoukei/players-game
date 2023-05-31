<script>
    //

    import debugChapter from "utility/debug-chapter.js"
    import game from "stores/store-game.js"
    import Trigger from "utility/trigger-svelte.js"
    import Resources from "utility/resources.js"
    import StoryLog from "utility/story-log.js"
    import Portal from "svelte-portal"
    import {slide} from "svelte/transition"
    import {onMount} from "svelte"

    export let chapter
    export let branch

    Trigger.on("bar-maxed", barEvent)

    $: resources = $game?.state?.resources ?? {}
    $: C1_Points = resources.C1_Points ?? 0
    $: C1_Loops = resources.C1_Loops ?? 0
    $: season = C1_Loops % 4
    $: Resources.set("bar_season", season)
    $: advanceStory(C1_Points, C1_Loops)

    function barEvent() {
        Resources.gain("C1_Loops")
        Resources.gain("C1_Points")
    }

    function advanceStory() {
        StoryLog.addRecord("c1_d_1")
    }

    onMount(() => advanceStory())

    if (import.meta.env.MODE === "development") debugChapter(chapter, branch)
</script>

<Portal target="#story-elements">
    <div class="stretched vertical gapped padded flex" transition:slide|local>
        {#if C1_Points}
            <div class="centered flex points" transition:slide|local>You have {C1_Points} {C1_Points > 1 ? "points" : "point"}</div>
        {/if}
    </div>
</Portal>
