let paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;
let ball_x, ball_y, ball_diameter, ball_dx, ball_dy;

function setup() {
  createCanvas(400, 400);

  paddle_width = 100; //100
  paddle_x = width / 2 - paddle_width / 2;
  paddle_y = height - 25;
  paddle_height = 15;

  brick_width = 45;
  brick_x = 240;
  brick_y = 100;
  brick_height = 20;

  ball_diameter = 20;
  ball_dx = 0.25; //1
  ball_dy = 0.5; //2

  paddle_dx = 3;

  ball_x = width / 2 - ball_diameter / 2;
  ball_y = height / 2 - ball_diameter / 2;
}

function draw() {
  background("black");

  //bounce on hitting side walls
  if (ball_x + ball_diameter / 2 > width || ball_x - ball_diameter / 2 < 0) {
    ball_dx = -ball_dx;
  }

  //game over on hitting floor
  if (ball_y + ball_diameter / 2 > height) {
    ball_dy = 0;
    ball_dx = 0;
  }

  //bounce on hitting roof
  if (ball_y - ball_diameter / 2 < 0) {
    ball_dy = -ball_dy;
  }

  //moving the ball with dx and dy
  ball_x = ball_x + ball_dx;
  ball_y = ball_y + ball_dy;

  //moving the PADDLE
  if (keyIsDown(LEFT_ARROW)) {
    paddle_x = paddle_x - paddle_dx;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    paddle_x = paddle_x + paddle_dx;
  }

  //bounce back on hitting the paddle
  if (
    ball_y + ball_diameter / 2 >= paddle_y &&
    ball_y + ball_diameter / 2 <= paddle_y + paddle_height &&
    ball_x >= paddle_x &&
    ball_x <= paddle_x + paddle_width
  ) {
    ball_dy = -ball_dy;
  }

  //break brick on hitting
  if (
    ball_y + ball_diameter / 2 >= brick_y &&
    ball_y + ball_diameter / 2 <= brick_y + brick_height &&
    ball_x >= brick_x &&
    ball_x <= brick_x + brick_width
  ) {
    brick_width = 0;
    //console.log("brick is hit");
  }

  circle(ball_x, ball_y, ball_diameter);
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  rect(brick_x, brick_y, brick_width, brick_height);
}
