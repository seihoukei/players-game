/*
    DO NOT MODIFY DIRECTLY
    USE node code_automation/compile_chapter.cjs TO COMPILE
*/
import Branches from "utility/branches.js"
import Chapter1_A from "story/chapter1/Chapter1_A.svelte"
import Chapter1_B from "story/chapter1/Chapter1_B.svelte"
import Chapter1_C from "story/chapter1/Chapter1_C.svelte"
import Chapter2_A from "story/chapter2/Chapter2_A.svelte"

const BRANCHES = [{
        chapter : "1",
        branch : "A",
        component : Chapter1_A,
        id : "1_A",
        unlockResource : Branches.unlockResource("1", "A")
    },{
        chapter : "1",
        branch : "B",
        component : Chapter1_B,
        id : "1_B",
        unlockResource : Branches.unlockResource("1", "B")
    },{
        chapter : "1",
        branch : "C",
        component : Chapter1_C,
        id : "1_C",
        unlockResource : Branches.unlockResource("1", "C")
    },{
        chapter : "2",
        branch : "A",
        component : Chapter2_A,
        id : "2_A",
        unlockResource : Branches.unlockResource("2", "A")
    }]

export default BRANCHES
