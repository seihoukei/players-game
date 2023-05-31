import Trigger from "utility/trigger-svelte.js"
import Resources from "utility/resources.js"

export default class Branches {
    static unlockResource(chapter = "", branch = "") {
        return `Branch_${chapter}_${branch}`
    }
    
    static connect(chapter, branch) {
        Resources.set(this.unlockResource(chapter, branch))
    }

    static disconnect(chapter, branch) {
        Resources.reset(this.unlockResource(chapter, branch))
    }
    
}
