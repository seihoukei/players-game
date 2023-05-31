const fs = require("fs")

const storyFolder = "./src/components/story"
const dataFolder = "./src/data"

const imports = []
const data = []

const chapters = fs.readdirSync(storyFolder)
    .filter(x => x.match(/^chapter.*$/))
    .map(x => x.match(/^chapter(.*)$/)[1])

for (const chapter of chapters) {
    const branches = fs.readdirSync(`${storyFolder}/chapter${chapter}/`)
        .filter(x => x.match(/^.*?_.*\.svelte$/))
        .map(x => x.match(/^.*?_(.*)\.svelte$/)[1])
    
    for (const branch of branches) {
        createBranchRecord(chapter, branch)
    }
}

function createBranchRecord(chapter, branch) {
    const id = `${chapter}_${branch}`
    const component = `Chapter${id}`
    const path = `story/chapter${chapter}/Chapter${id}.svelte`
    
    imports.push(`import ${component} from "${path}"`)
    
    data.push(`{
        chapter : "${chapter}",
        branch : "${branch}",
        component : ${component},
        id : "${id}",
        unlockResource : Branches.unlockResource("${chapter}", "${branch}")
    }`)
}

fs.writeFileSync(`${dataFolder}/data-branches.js`, `\
/*
    DO NOT MODIFY DIRECTLY
    USE node code_automation/compile_chapter.cjs TO COMPILE
*/
import Branches from "utility/branches.js"
${
    imports.join("\n")
}

const BRANCHES = [${
    data.join(",")
}]

export default BRANCHES
`)
