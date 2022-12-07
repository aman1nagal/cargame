const score=document.querySelector(".score")
const startScreen=document.querySelector(".startScreen")
const gameArea=document.querySelector(".gameArea")
startScreen.addEventListener("click",start)
document.addEventListener("keydown",pressKey)
document.addEventListener("keyup",releaseKey)
let keys={
    ArrowUp:false,
    ArrowRight:false,
    ArrowLeft:false,
    ArrowDown:false
}
let player={
    carStart:false,
    // x:0,y:0,
    speed:2,
    score:0
}

function pressKey(e){
    let pressKey=e.key
    
    if(pressKey=="ArrowUp"||pressKey=="ArrowRight"||pressKey=="ArrowLeft"||pressKey=="ArrowDown"){
        keys[pressKey]=true
    }
    // console.log(pressKey)
}
function releaseKey(e){
    let pressKey=e.key
    if(pressKey=="ArrowUp"||pressKey=="ArrowRight"||pressKey=="ArrowLeft"||pressKey=="ArrowDown"){
        keys[pressKey]=false
    }
}
function start(){
    startScreen.classList.add("hide")
    // gameArea.classList.remove("hide")
    gameArea.innerHTML=""
    score.classList.remove("hide")
    player.carStart=true
    window.requestAnimationFrame(playGame)
    for(x=0;x<5;x++){
    let roadLine=document.createElement("div")
    roadLine.setAttribute("class","lines")
    roadLine.y=x*150
    roadLine.style.top=roadLine.y+"px"
    gameArea.appendChild(roadLine)
    }
    let car=document.createElement("div")
    // car.innerText="Mycar"
    car.setAttribute("class","car")
    gameArea.appendChild(car)
    player.x=car.offsetLeft
    player.y=car.offsetTop
    for(x=0;x<3;x++){
        let enemyCar=document.createElement("div")
        enemyCar.setAttribute("class","enemy")
        enemyCar.y=((x+1)*350)*-1
        enemyCar.style.top=enemyCar.y+"px"
        enemyCar.style.backgroundColor="red"
        enemyCar.style.left=Math.floor(Math.random()*350)+"px"
        gameArea.appendChild(enemyCar)
        }
}
function moveLines(){
    let lines=document.querySelectorAll('.lines')
    // console.log(lines)
    lines.forEach(function(item){
        if(item.y>=724){
            item.y -= 740
        }
        item.y+=player.speed+4
        item.style.top=item.y+"px"
    })
}
function isCollision(a,b){
    myCar=a.getBoundingClientRect()
    enemyCar=b.getBoundingClientRect()
    // console.log(`working mode`)
    // console.log((myCar.bottom<enemyCar.to))
    // console.log((myCar.top>enemyCar.bottom))
    // console.log((myCar.right<enemyCar.left))
    // console.log((myCar.left>enemyCar.right))
    return!((myCar.bottom<enemyCar.top)||(myCar.top>enemyCar.bottom)||(myCar.right<enemyCar.left)||(myCar.left>enemyCar.right))
}
function endGame(){
    player.carStart=false
    startScreen.classList.remove("hide")
}
function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy')
    // console.log(lines)
    enemy.forEach(function(item){
        if(isCollision(car,item)){
            console.log('hit ho gaya')
            endGame()
        }
        if(item.y>=724){
            item.y = -390
            item.style.left=Math.floor(Math.random()*350)+"px"
        }
        item.y+=player.speed+4
        item.style.top=item.y+"px"
    })
}
function playGame(){
    let car=document.querySelector(".car")
    let road=gameArea.getBoundingClientRect()
   
    // console.log(road)
    if(player.carStart){
        moveLines()
        moveEnemy(car)
        if(keys.ArrowUp&&player.y>(road.top+180)){
            player.y -=player.speed
        }
        if(keys.ArrowDown&&player.y<(road.bottom-118)){
            player.y += player.speed
        }
        if(keys.ArrowLeft&&player.x>0){
            player.x -= player.speed
        }
        if(keys.ArrowRight&&player.x<(road.width-60)){
            player.x+=player.speed
        }
        car.style.top=player.y+ "px"
        car.style.left=player.x+ "px"
    window.requestAnimationFrame(playGame)
    player.score++
    score.innerText="The Score Is "+player.score
    }
}