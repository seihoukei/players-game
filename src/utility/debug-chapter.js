import {onDestroy, onMount} from "svelte"

export default function debugChapter(chapter, branch) {
    onMount(() => {
        console.log(`Chapter${chapter}_${branch} connected`)
    })
    
    onDestroy(() => {
        console.log(`Chapter${chapter}_${branch} disconnected`)
    })
}
