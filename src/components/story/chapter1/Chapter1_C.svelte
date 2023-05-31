<script>
    // Start => Second Upgrade
    // => Endless bars ending

    import debugChapter from "utility/debug-chapter.js"
    import game from "stores/store-game.js"
    import Trigger from "utility/trigger-svelte.js"
    import Resources from "utility/resources.js"
    import StoryLog from "utility/story-log.js"
    import Portal from "svelte-portal"
    import {slide} from "svelte/transition"
    import {onMount} from "svelte"
    import DisplayString from "utility/display-string/display-string.js"
    import UIProgressBar from "components/ui/elements/UIProgressBar.svelte"

    const BAR_COLORS = [
        '#337777',
        '#333377',
        '#773377',
        '#773333',
        '#777733',
        '#337733',
    ]

    const STORY_BARS = 3

    export let chapter
    export let branch

    Trigger.on("command-advance", advance)

    $: resources = $game?.state?.resources ?? {}
    $: C1_Bars = resources.C1_Bars ?? 1
    $: mainBar = $game?.state?.bar
    $: advanceStory(C1_Bars)

    const bars = []

    function advanceStory() {
        Resources.set('C1_Bars', C1_Bars)
        StoryLog.addRecord("c1_c_1")
    }

    function advance(time) {
        let speed = mainBar.current / mainBar.max * time
        for (let i = 0; i < C1_Bars; i++) {
            const id = `C1_Bar${i}`
            bars[i] ??= {
                max : 10,
                current : resources[id] ?? 0,
            }

            bars[i].current += speed

            while (bars[i].current > bars[i].max) {
                bars[i].current -= bars[i].max
                if (i === C1_Bars - 1) {
                    if (i < STORY_BARS)
                        StoryLog.addRecord(`c1_c_2_${i+1}`)
                    if (i === STORY_BARS - 1)
                        StoryLog.addRecord(`c1_c_3`)
                    Resources.set('C1_Bars', C1_Bars + 1)
                }
            }

            Resources.set(id, bars[i].current)

            speed *= (bars[i].current / bars[i].max)
        }
    }

    onMount(() => advanceStory())

    if (import.meta.env.MODE === "development") debugChapter(chapter, branch)
</script>

<Portal target="#story-elements">
    <div class="stretched vertical gapped flex bars" transition:slide|local>
        {#each bars as bar, index}
            <div class="bar">
                <UIProgressBar
                        max={bar.max}
                        current={bar.current}
                        caption={`${DisplayString.number(bar.current)} / ${DisplayString.shortNumber(bar.max)}`}
                        fgcolor={BAR_COLORS[index % BAR_COLORS.length]}
                />
            </div>
        {/each}
    </div>
</Portal>

<style>

    div.bar {
        height: 50px;
    }
</style>
