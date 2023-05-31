<script>
    import debugChapter from "utility/debug-chapter.js"
    import game from "stores/store-game.js"
    import Trigger from "utility/trigger-svelte.js"
    import StoryLog from "utility/story-log.js"

    export let chapter
    export let branch

    Trigger.on("bar-maxed", barEvent)

    $: resources = $game?.resources ?? {}

    $: advanceStory(/*variables*/)

    function barEvent() {

    }

    function advanceStory() {

    }

    if (import.meta.env.MODE === "development") debugChapter(chapter, branch)
</script>
