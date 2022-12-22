var ground;
var player, player_animation, player_down;
var car1, car2, car3;
var car1_img, car2_img, car3_img;
var car1grp, car2grp, car3grp;
var PLAY = 1;
var gameState = PLAY;
var END = 2;
var gameOver, gameover;
var score = 0;
var edges;

function preload() {
  groundImage = loadImage("Road.png");
  car1_img = loadImage("car1.png");
  car2_img = loadImage("car2.png");
  car3_img = loadImage("car3.png");
  gameOver = loadImage("gameOver.png");
  player_down = loadAnimation("player_down.png");
  player_animation = loadAnimation(
    "player_frame1.png",
    "player_frame2.png",
    "player_frame3.png",
    "player_frame4.png",
    "player_frame5.png",
    "player_frame6.png",
    "player_frame7.png",
    "player_frame8.png"
  );
  bg = loadImage("background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  edges = createEdgeSprites();

  ground = createSprite(width / 2, height / 2, width, 2);
  ground.scale = 3;
  ground.addImage("ground", groundImage);
  ground.x = width / 2;

  player = createSprite(80, 200, 20, 50);
  player.scale = 0.8;
  player.addAnimation("running", player_animation);
  player.addAnimation("playerDown", player_down);

  gameover = createSprite(650, 150);
  gameover.addImage(gameOver);
  gameover.scale = 0.8;

  invground = createSprite(width / 2, height + 300, width, 10);
  invground.visible = false;

  car1grp = new Group();
  car2grp = new Group();
  car3grp = new Group();
}
function draw() {
  background(bg);

  if (gameState === PLAY) {
    gameover.visible = false;
    score = score + Math.round(getFrameRate() / 50);
    ground.velocityX = -(6 + (2 * score) / 150);

    player.y = World.mouseY;

    //code to reset the background

    if (ground.x < 600) {
      ground.x = width / 2;
    }

    if (frameCount % 150 == 0) {
      var cars = Math.round(random(1, 3));

      if (cars == 1) {
        blueCar();
      } else if (cars == 2) {
        yellowCar();
      } else {
        brownCar();
      }
    }

    if (
      car1grp.isTouching(player) ||
      car2grp.isTouching(player) ||
      car3grp.isTouching(player)
    ) {
      gameState = END;
      player.velocityX = 0;
      //player.addAnimation("playerDown",player_down);
    }
  }
  if (gameState === END) {
    gameover.visible = true;

    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500, 200);

    ground.velocityX = 0;
    player.velocityY = 0;
    player.changeAnimation("playerDown", player_down);

    car1grp.setVelocityXEach(0);
    car1grp.setLifetimeEach(-1);

    car2grp.setVelocityXEach(0);
    car2grp.setLifetimeEach(-1);

    car3grp.setVelocityXEach(0);
    car3grp.setLifetimeEach(-1);

    //if(yellowCar.isTouching(player)){
    //gameState = END;
    //player.velocityY = 0;
    //player.addAnimation("playerDown",player_down);
    //}

    //if(redCG.isTouching(mainCyclist)){
    //  gameState = END;
    //player3.velocityY = 0;
    //player.addAnimation("playerDown",player_down);
    //}
    //}
  }
  player.collide(edges);

  drawSprites();

  textSize(20);
  fill(100);
  text("Score: " + score, 300, 50);
}
function blueCar() {
  car1 = createSprite(width - 100, Math.round(random(50, 600)));
  car1.scale = 1.5;
  car1.velocityX = -(6 + (2 * score) / 150);
  car1.addImage("first car", car1_img);
  car1.setLifetime = 170;
  car1grp.add(car1);
}

function yellowCar() {
  car2 = createSprite(width - 100, Math.round(random(50, 600)));
  car2.scale = 1.5;
  car2.velocityX = -(6 + (2 * score) / 150);
  car2.addImage("second car", car2_img);
  car2.setLifetime = 170;
  car2grp.add(car2);
}
function brownCar() {
  car3 = createSprite(width - 100, Math.round(random(50, 600)));
  car3.scale = 1.5;
  car3.velocityX = -(6 + (2 * score) / 150);
  car3.addImage("third car", car1_img);
  car3.setLifetime = 170;
  car3grp.add(car3);
}
