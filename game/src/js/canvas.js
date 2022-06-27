import platform from '../img/platform.png'
import hills from '../img/hills.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'
console.log(platform)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 500


const gravity = 1.5

//draw sprites
class Player {
  constructor(){
    this.speed = 7
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity ={
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30
  }

  draw(){
    c.fillStyle = 'hotpink'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(){
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    if(this.position.y + this.height + 
      this.velocity.y <= canvas.height)
      this.velocity.y += gravity
    }
}

class Platform {
  constructor({x, y, image}){
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw(){
   c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject {
  constructor({x, y, image}){
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw(){
   c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class Goal {
  constructor(){
    this.position = {
      x: 3275,
      y: 226
    },
    this.width = 30,
    this.height = 150
  }
  draw(){
    c.fillStyle = 'black'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
   }
}
class Enemy {
  constructor(){
    this.position = {
      x: 400,
      y: 325
    },
    this.velocity ={
      x: 0,
      y: 0
    },
    this.width = 50,
    this.height = 50
  }
  draw(){
    c.fillStyle = 'black'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
   }
   update(){
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x

    
    }

}

function createImage(imageSrc){
  const image = new Image()
    image.src = imageSrc
  return image
}

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)

let player = new Player()
let platforms = []
let genericObject = []

let goal = new Goal()
let enemy = new Enemy()



const keys = {
  right:{
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0

function init(){
 platformImage = createImage(platform)
console.log(platformImage.width)
 player = new Player()
 console.log(goal.position)
platforms = [
  new Platform({
    x: platformImage.width * 3 + 250 + platformImage.
    width - platformSmallTallImage.width,
    y: 255, 
    image: createImage(platformSmallTall)
  }),
  new Platform({
  x: -1, 
  y: 375,
  image: platformImage
}), 
  new Platform({
    x: platformImage.width -3, 
    y: 375, 
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 2 + 100, 
    y: 375, 
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 3 + 250, 
    y: 375, 
    image: platformImage
  }),
  new Platform({
    x: platformImage.width * 4 + 475, 
    y: 375, 
    image: platformImage
  })
 
]

genericObject = [
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(background)
  }),
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(hills)
  })
]

goal =  new Goal()
enemy = new Enemy()

 scrollOffset = 0


}

function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  genericObject.forEach(genericObject =>{
    genericObject.draw()
  })

  platforms.forEach((platform) => {
      platform.draw()
    })    
      
    

    player.update()    

    goal.draw()
    enemy.update()
    
    if(keys.right.pressed && player.position.x < 400){
      player.velocity.x = player.speed
  } else if (
  (keys.left.pressed && player.position.x > 100) || 
   keys.left.pressed && scrollOffset === 0 && player.position.x > 2)
  {
    player.velocity.x = -player.speed
  }else{
    player.velocity.x = 0
  }
  
  if(keys.right.pressed){
    scrollOffset += player.speed
    platforms.forEach((platform) => {
      platform.position.x -= player.speed
    })
    genericObject.forEach(genericObject => {
      genericObject.position.x -= player.speed * 0.66
    })
    
      goal.position.x -= player.speed
      enemy.position.x -= player.speed
      
  } else if (keys.left.pressed && scrollOffset > 0){
    scrollOffset -= player.speed

    platforms.forEach((platform) => {
      platform.position.x += player.speed
    })
    genericObject.forEach(genericObject => {
      genericObject.position.x += player.speed * 0.66
    })
      goal.position.x += player.speed
      enemy.position.x += player.speed
  }
  
  
  // player collision detection
  platforms.forEach((platform) => {
    if(player.position.y + player.height 
    <= platform.position.y && 
    player.position.y + player.height +
    player.velocity.y >= platform.position.y &&
    player.position.x + player.width >= 
    platform.position.x && player.position.x 
     <= platform.position.x + platform.width){
      player.velocity.y = 0
    }
  })

  //enemy walking

  function eWalk(){
    const e =  enemy.velocity.x = 0.20
    
    console.log(e)
  }

  

  eWalk()
  console.log(eWalk())

    //win 
   
  if(scrollOffset > 2850){
    document.getElementById("finnish").style.display = "block";
   
  }
 

//lose against enemy
  if(player.position.x + player.width >= enemy.position.x && 
    player.position.x  <= enemy.position.x + enemy.width && 
    player.position.y + player.height >= enemy.position.y){
      init()
    
  }

  //lose
if (player.position.y > canvas.height ){
    init()
  }
 

  
} 





init()
animate()



addEventListener('keydown', ({key}) => {
  switch(key){
    case 'a':
      keys.left.pressed = true
    break
    case 's':
    break
    case 'd':
    keys.right.pressed = true
    break
    case 'w':
      
      player.velocity.y -= 20
      
    break
  }
})

addEventListener('keyup', ({key}) => {
  switch(key){
    case 'a':
      keys.left.pressed = false
    break
    case 's':
      console.log('down')
    break
    case 'd':
      keys.right.pressed = false
    break
    case 'w':
      player.velocity.y -= 0
    break
  }
})