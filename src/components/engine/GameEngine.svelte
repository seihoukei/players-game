<script>
    import GameBar from "components/engine/elements/GameBar.svelte"
    import SaveStateManager from "utility/state/SaveStateManager.svelte"
    import GameSettings from "utility/settings/GameSettings.svelte"
    import GameTimer from "utility/timer/GameTimer.svelte"

    import game from "stores/store-game.js"
    import GameResources from "components/engine/elements/GameResources.svelte"
    import GameStory from "components/engine/GameStory.svelte"
    import GameLog from "components/engine/elements/GameLog.svelte"
    import Trigger from "utility/trigger-svelte.js"

    let state, gameId

    $: $game.state = state
    $: $game.id = gameId

    Trigger.on("command-restart-story", restartStory)

    function restartStory() {
        delete state.log
        delete state.resources
        delete state.bar
        gameId = Math.random()
    }

    function milestoneFunction() {
        //get time to events that affect calculations in a major way
        return []
    }

    function metaFunction() {
        // form a metadata to access via saveInfo
        return {
            time : state?.targetTime,

            barValue : state?.bar?.value,
            barMax : state?.bar?.max,
        }
    }

    function versionFunction(data, version) {
        //update save from different version
        return data
    }

    function offlineFunction(state, time) {
        //modify freshly loaded state according to offline time
        //executed before state is actually assigned to game.state
        //state.targetTime += time

        return state
    }
</script>
<SaveStateManager bind:state
                  bind:id={gameId}
                  {metaFunction}
                  {offlineFunction}
                  {versionFunction}
/>

{#key gameId}
    {#if state}
        <GameResources bind:resources={state.resources} />
        <GameBar bind:bar={state.bar} boostable />
        <GameLog bind:log={state.log} />

        <GameSettings bind:settings={state.settings} />
        <GameStory />

        <GameTimer {milestoneFunction}
                   bind:time={state.time}
                   bind:targetTime={state.targetTime}
        />
    {/if}
{/key}
