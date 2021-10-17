let player_speed = 20;
let ballspeedx = 1;
let ballspeedy = 1;
let speed_up = false;

class Player {
  constructor(targetelement) {
    this.rod = targetelement;
    this.x = 0;
    this.y = 0;
  }
  get_current_y_coordinate() {
    return this.y;
  }
  get_current_x_coordinate() {
    return this.x;
  }
  set_x_coordinate(final_x) {
    this.x = final_x;
    this.rod.style.left = final_x;
  }
  set_y_coordinate(final_y) {
    this.y = final_y;
    this.rod.style.top = final_y;
  }
}

class ball {
  constructor(targetelement) {
    this.stone = targetelement;
    this.x = 0;
    this.y = 0;
    return;
  }
  get_current_y_coordinate() {
    return this.y;
  }
  get_current_x_coordinate() {
    return this.x;
  }
  set_coordinates(final_x, final_y) {
    this.x = final_x;
    this.y = final_y;
    this.stone.style.left = final_x;
    this.stone.style.top = final_y;
    return;
  }
}

class Heading {
  constructor(targetelement) {
    this.head = targetelement;
    this.x = 0;
    this.y = 0;
  }
  get_current_y_coordinate() {
    return this.y;
  }
  get_current_x_coordinate() {
    return this.x;
  }
  set_x_coordinate(final_x) {
    this.x = final_x;
    this.head.style.left = final_x;
  }
  set_y_coordinate(final_y) {
    this.y = final_y;
    this.head.style.top = final_y;
  }
}
var w = window.innerWidth;
var h = window.innerHeight;
var rodlen = Math.floor((20 * w) / 100);
let r1 = document.querySelector(".rod1");
let r2 = document.querySelector(".rod2");
let b = document.querySelector(".ball");

let heading = document.querySelector(".heading");

let player1 = new Player(r1);
let player2 = new Player(r2);

let stone = new ball(b);
let head = new Heading(heading);

function initialise_game(p1, p2, o, head) {
  console.log(h, w);
  p1.set_x_coordinate(0);
  p2.set_x_coordinate(0);
  p1.set_y_coordinate(20);
  p2.set_y_coordinate(h - 50);
  o.set_coordinates(w / 2, h / 2);
  head.set_x_coordinate(0);
  head.set_y_coordinate(h / 2);
  return;
}
document.addEventListener("keypress", function (event) {
  //console.log(event.keyCode);
  let op = event.keyCode;

  //console.log(typeof(op));
  if (op == 97) {
    let player1_x = player1.get_current_x_coordinate();
    player1_x -= player_speed;
    if (player1_x < 0) {
      player1_x = 0;
    }
    player1.set_x_coordinate(player1_x);
  }
  if (op == 100) {
    let player1_x = player1.get_current_x_coordinate();
    player1_x += player_speed;
    if (player1_x > w - rodlen - 10) {
      player1_x = w - rodlen - 10;
    }
    player1.set_x_coordinate(player1_x);
  }
  if (op == 113) {
    let player2_x = player2.get_current_x_coordinate();
    player2_x -= player_speed;
    if (player2_x <= 0) {
      player2_x = 0;
    }
    player2.set_x_coordinate(player2_x);
  }
  if (op == 101) {
    let player2_x = player2.get_current_x_coordinate();
    player2_x += player_speed;
    if (player2_x > w - rodlen - 10) {
      player2_x = w - rodlen - 10;
    }
    player2.set_x_coordinate(player2_x);
  }
});

initialise_game(player1, player2, stone, head);

// console.log(player1.get_current_x_coordinate());
// console.log(player2.get_current_x_coordinate());

// console.log(stone.get_current_x_coordinate());

interval = setInterval(() => {
  let ball_x = stone.get_current_x_coordinate();
  let ball_y = stone.get_current_y_coordinate();
  let player1_x = player1.get_current_x_coordinate();
  let player2_x = player2.get_current_x_coordinate();
  let player1_y = player1.get_current_y_coordinate() + 30;
  let player2_y = player2.get_current_y_coordinate();
  let head_x = head.get_current_x_coordinate();
  console.log(head_x);
  console.log(ball_x, ball_y, player1_x, player1_y, player2_x, player2_y);
  if (ball_y <= player1_y - 15) {
    if (ball_x < player1_x || ball_x > player1_x + rodlen) {
      alert("Player-2 Won");
      clearInterval(interval);
    }
    if (ballspeedx < 0) {
      ballspeedx -= 0.1;
    } else {
      ballspeedx += 0.1;
    }
    if (ballspeedy < 0) {
      ballspeedy -= 0.1;
    } else {
      ballspeedy += 0.1;
    }
    ballspeedy = -1 * ballspeedy;
  }
  if (ball_y >= player2_y - 15) {
    if (ball_x < player2_x || ball_x > player2_x + rodlen) {
      alert("Player-1 Won");
      clearInterval(interval);
    }
    if (ballspeedx < 0) {
      ballspeedx -= 0.1;
    } else {
      ballspeedx += 0.1;
    }
    if (ballspeedy < 0) {
      ballspeedy -= 0.1;
    } else {
      ballspeedy += 0.1;
    }
    ballspeedy = -1 * ballspeedy;
  }
  if (ball_x <= 0 || ball_x > w - 50) {
    ballspeedx = -1 * ballspeedx;
  }
  ball_x += ballspeedx;
  ball_y += ballspeedy;
  head_x += 1;
  head_x %= w - 500;
  head.set_x_coordinate(head_x);
  stone.set_coordinates(ball_x, ball_y);
}, 10);

// console.log(player1.get_current_x_coordinate());
// console.log(player2.get_current_x_coordinate());

// console.log(stone.get_current_x_coordinate());
