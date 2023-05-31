<script>
    import UIMeta from "./UIMeta.svelte"
    import UIBar from "components/ui/elements/UIBar.svelte"
    import DisplayString from "utility/display-string/display-string.js"
    import game from "stores/store-game.js"
    import UIDialogs from "utility/dialog/UIDialogs.svelte"
    import UIToolTip from "utility/tooltip/UIToolTip.svelte"
    import UIStoryLog from "components/ui/UIStoryLog.svelte"
    import GameStory from "components/engine/GameStory.svelte"

    $: state = $game?.state ?? null

</script>

{#if import.meta.env.MODE === "development"}
    <pre class="debug">{JSON.stringify($game, null, 1).replace(/(\d+\.\d{1,2})\d+/g,"$1")}</pre>
{/if}

{#if state}

    <UIMeta />
    <div class="content">
        <UIBar bar={state.bar} />
        <div id="story-elements"></div>
    </div>

    <UIStoryLog />
    <UIDialogs />
    <UIToolTip />
{/if}

<style>
    pre.debug {
        position: absolute;
        left : 0;
        top : 20px;
        color: white;
        opacity: 0.3;
        pointer-events: none;
        font-size: 8px;
        z-index : 1000;
    }

    div.content {
        position : absolute;
        left : 1rem;
        top : 2rem;
        right : 1rem;
        bottom : 25vh;
        overflow : hidden auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    div#story-elements {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow : hidden auto;
        margin : 1rem 0;
    }
</style>
