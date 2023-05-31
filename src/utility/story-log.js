import Trigger from "utility/trigger-svelte.js"

export default class StoryLog {
    static addRecord(id, time) {
        Trigger("command-add-log-entry", id, time)
    }
}
