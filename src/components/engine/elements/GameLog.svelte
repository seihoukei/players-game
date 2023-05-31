<script>
    import Trigger from "utility/trigger-svelte.js"
    import game from "stores/store-game.js"

    Trigger.on("command-add-log-entry", addEntry)
    export let log = {}

    function addEntry(id, time = $game?.state?.time ?? 0) {
         if ((log[id] ?? null) !== null)
            return

        log[id] = time
    }
</script>
