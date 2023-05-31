<script>
    import game from "stores/store-game.js"
    import BRANCHES from "data/data-branches.js"

    $: resources = $game?.state?.resources ?? {}
</script>

{#each BRANCHES as {chapter, branch, component, id, unlockResource} (id)}
    {#if resources[unlockResource]}
        <svelte:component
                this={component}
                {chapter}
                {branch}
        />
    {/if}
{/each}
