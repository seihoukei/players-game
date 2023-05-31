<script>
    // Start => First upgrade
    // => Chapter 2
    // => Pointless ending

    import debugChapter from "utility/debug-chapter.js"
    import game from "stores/store-game.js"
    import Trigger from "utility/trigger-svelte.js"
    import Resources from "utility/resources.js"
    import StoryLog from "utility/story-log.js"
    import Branches from "utility/branches.js"
    import Portal from "svelte-portal"
    import {slide} from "svelte/transition"
    import {onMount} from "svelte"

    export let chapter
    export let branch

    Trigger.on("bar-maxed", barEvent)

    $: resources = $game?.state?.resources ?? {}
    $: C1_Points = resources.C1_Points ?? 0
    $: C1_Loops = resources.C1_Loops ?? 0
    $: C1_Fixed = resources.C1_Fixed ?? 0
    $: season = C1_Loops % 4
    $: Resources.set("bar_season", season)
    $: advanceStory(C1_Points, C1_Loops)

    $: fixVisible = C1_Points >= 5 && C1_Loops >= 2

    function barEvent() {
        Resources.gain("C1_Loops")
    }

    function advanceStory() {
        StoryLog.addRecord("c1_b_0")
        if (C1_Loops >= 1) StoryLog.addRecord("c1_b_1")
        if (C1_Loops >= 2) StoryLog.addRecord("c1_b_2")
        if (C1_Points < 5 && !C1_Fixed) {
            if (C1_Loops >= 3) StoryLog.addRecord("c1_b_3_1")
            if (C1_Loops >= 4) StoryLog.addRecord("c1_b_3_2")
            if (C1_Loops >= 5) StoryLog.addRecord("c1_b_3_3")
            if (C1_Loops >= 6) StoryLog.addRecord("c1_b_3_4")
        } else {
            if (C1_Loops >= 2) StoryLog.addRecord("c1_b_4_1")
        }
    }

    function fixBar() {
        Resources.gain("C1_Points", -5)
        Resources.gain("C1_Fixed", 1)
        Branches.disconnect(chapter, branch)
        Branches.connect("2", "A")
    }

    onMount(() => advanceStory())

    if (import.meta.env.MODE === "development") debugChapter(chapter, branch)
</script>

<Portal target="#story-elements">
    <div class="stretched vertical gapped padded flex" transition:slide|local>
        {#if C1_Points}
            <div class="centered flex points" transition:slide|local>You have {C1_Points} {C1_Points > 1 ? "points" : "point"}</div>
        {/if}
        <div class="horizontal gapped centered flex buttons">
            {#if fixVisible}
                <div class="padded centered center-text button" on:click={fixBar} transition:slide|local>5 points <br> Fix the bar</div>
            {/if}
        </div>
    </div>
</Portal>
