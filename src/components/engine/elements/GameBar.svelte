<script>
    import Trigger from "utility/trigger-svelte.js"

    export let bar = {
        current : 0,
        max : 10,
    }

    export let boostable = false

    let boost = 1

    Trigger.on("command-advance", advance)
    Trigger.on("command-set-bar-boost", setBoost)

    function advance(time) {
        if (!bar)
            return

        bar.current += time * boost
        while (bar.current >= bar.max) {
            bar.current -= bar.max
            Trigger("bar-maxed")
        }
    }

    function setBoost(value = 1) {
        if (!boostable)
            return false

        boost = value
    }

</script>
