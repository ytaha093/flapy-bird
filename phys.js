let bird
let ground
let velocity
document.addEventListener("DOMContentLoaded", () => {

    document.addEventListener("keydown", (e) => {
        if (!e.repeat) {
            velocity = velocity < -16 ? (velocity < -20 ? 11 : 12) : 13
            console.log(velocity)
        }
    })

    start()
    setInterval(updateBird, 20)
    setInterval(makePipe, 1220)
    setInterval(updatePipes, 28)
    
    function start() {
        bird = document.querySelector("#bird")
        ground = document.querySelector("#ground")
        velocity = 2
    }
    
    function updateBird() {
        velocity = velocity > -22 ? velocity - 0.8 : velocity
        bird.style.top = Math.max(Math.min(bird.offsetTop - velocity, ground.offsetTop - bird.offsetHeight), 0) + "px"  
        if (bird.offsetTop == 0) velocity--
        if (bird.offsetTop == ground.offsetTop - bird.offsetHeight) {
            location.reload()
        }
    }

    function makePipe() {
        let pipeTop = document.createElement("div")
        pipeTop.classList.add("top-pipe")
        let pipeBot = document.createElement("div")
        pipeBot.classList.add("bottom-pipe")
        spreadPipes(pipeTop, pipeBot)
    }

    function spreadPipes(topPipe, botPipe) {
        document.body.appendChild(topPipe);
        document.body.appendChild(botPipe);
        //let oldRandom = Math.max(Math.min(Math.random(), 0.68), 0.07)
        let random = (Math.random() * 0.65) + 0.05
        let groundHeight = document.querySelector("#ground").offsetHeight
        let totalPipeArea = document.body.offsetHeight - groundHeight
        let topPipeHeight = (totalPipeArea * random)
        let botPipeHeight = totalPipeArea - topPipeHeight - (totalPipeArea * 0.19)
        // make so not 2 close to ground


        topPipe.style.height = topPipeHeight + "px"
        botPipe.style.height = botPipeHeight + "px"
        topPipe.style.top = "-1px"
        botPipe.style.bottom = groundHeight - 2 + "px"

    }

    function updatePipes() {
        let pipes = document.querySelectorAll(".bottom-pipe, .top-pipe")
        pipes.forEach( (pipe) => {
            let incriment = document.body.offsetWidth/170
            pipe.style.left = (pipe.offsetLeft - incriment) + "px"
            if (pipe.offsetLeft < -50) {
                pipe.remove()
            }
            if (isCollide(pipe, bird)) {
                location.reload()
            }
        })
    }

    function isCollide(a, b) {
        let collidingX = b.offsetLeft + b.offsetWidth > a.offsetLeft && b.offsetLeft < a.offsetLeft + a.offsetWidth
        let collidingY = b.offsetTop < a.offsetTop + a.offsetHeight && b.offsetTop + b.offsetHeight > a.offsetTop
        if (collidingX && collidingY) {
            return true
        } else return false

        return collidingX && collidingY
    }

})
