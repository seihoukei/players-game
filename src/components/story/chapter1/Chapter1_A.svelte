<script>
    //Game start
    //=> 1_B
    //=> 1_C
    //=> Patient ending

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
    $: advanceStory(C1_Points)

    $: upgrade1Visible = C1_Points >= 3 && C1_Points < 10
    $: upgrade2Visible = C1_Points >= 7 && C1_Points < 10

    function barEvent() {
        Resources.gain("C1_Points")
    }

    function advanceStory() {
        StoryLog.addRecord("c1_a_1")
        if (C1_Points >= 1) StoryLog.addRecord("c1_a_2")
        if (C1_Points >= 3) StoryLog.addRecord("c1_a_3")
        if (C1_Points >= 5) StoryLog.addRecord("c1_a_4")
        if (C1_Points >= 7) StoryLog.addRecord("c1_a_5")
        if (C1_Points >= 8) StoryLog.addRecord("c1_a_6")
        if (C1_Points >= 10) StoryLog.addRecord("c1_a_7")
        if (C1_Points >= 12) StoryLog.addRecord("c1_a_8")
        if (C1_Points >= 14) StoryLog.addRecord("c1_a_9")
        if (C1_Points >= 15) {
            StoryLog.addRecord("c1_a_10")
            StoryLog.addRecord("c1_a_11")
        }
    }

    function upgrade1() {
        Resources.gain("C1_Points", -3)
        Branches.disconnect(chapter, branch)
        Branches.connect(chapter, "B")
    }

    function upgrade2() {
        Resources.gain("C1_Points", -7)
        Branches.disconnect(chapter, branch)
        Branches.connect(chapter, "C")
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
            {#if upgrade1Visible}
                <div class="padded centered center-text button" on:click={upgrade1} transition:slide|local>3 points <br> Upgrade</div>
            {/if}
            {#if upgrade2Visible}
                <div class="padded centered center-text button" on:click={upgrade2} transition:slide|local>7 points <br> Better Upgrade</div>
            {/if}
        </div>
    </div>
</Portal>
