<script>
    import UIProgressBar from "components/ui/elements/UIProgressBar.svelte"

    import DisplayString from "utility/display-string/display-string.js"

    import tooltip from "utility/tooltip/use-tooltip.js"
    import Trigger from "utility/trigger-svelte.js"
    import game from "stores/store-game.js"

    export let bar

    const BAR_COLORS = [
        ["#333333", "#337733"],
        ["#337733", "#773333"],
        ["#773333", "#333377"],
        ["#333377", "#333333"],
        ["#333333", "#337733"],// overflow safeguard
    ]

    $: season = $game?.state?.resources?.bar_season ?? 0

    function checkMouseBoost(event) {
        if (event.shiftKey)
            Trigger("command-set-bar-boost", 10)
    }

    function checkTouchBoost(event) {
        if (event.touches.length >= 2)
            Trigger("command-set-bar-boost", 10)
    }

    function stopBoost() {
        Trigger("command-set-bar-boost", 1)
    }
</script>

{#if bar}
     <div class="bar"
          on:mousedown={checkMouseBoost}
          on:mouseup={stopBoost}
          on:mouseleave={stopBoost}
          on:touchstart={checkTouchBoost}
          on:touchend={stopBoost}
          on:touchcancel={stopBoost}
     >
        <UIProgressBar
                max={bar.max}
                current={bar.current}
                caption={`${DisplayString.number(bar.current)} / ${DisplayString.shortNumber(bar.max)}`}
                bgcolor={BAR_COLORS[season][0]}
                fgcolor={BAR_COLORS[season][1]}
        />
    </div>
{/if}

<style>
    div.bar {
        height: 50px;
    }
</style>
