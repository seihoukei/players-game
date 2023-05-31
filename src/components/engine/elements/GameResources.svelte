<script>
    import Trigger from "utility/trigger-svelte.js"
    import Branches from "utility/branches.js"

    export let resources = {
        [Branches.unlockResource("1", "A")] : 1
    }

    Trigger.on("command-gain-resource", gainResource)
    Trigger.on("command-reset-resource", resetResource)
    Trigger.on("command-set-resource", setResource)

    function gainResource(name, amount = 1) {
        resources[name] = (resources[name] ?? 0) + amount
    }

    function setResource(name, value = 1) {
        if (!value)
            resetResource(name)
        else
            resources[name] = value
    }

    function resetResource(name) {
        delete resources[name]
    }

</script>
