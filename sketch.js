//shows in red when last live remains
//score in green when last brick remains
//game over and wohoo alerts
//red brick deducts 2 points
//green brick gives 5 points
//colored the paddle and bricks


let paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;
let ball_x, ball_y, ball_diameter, ball_dx, ball_dy;

let brickRowCount, brickColCount, brickWidth, brickHeight, brickPadding;
const bricks = [];

let score = 0;
let lives = 3;
let brickCount = 14;

function setup() {
	createCanvas(400, 400);

	paddle_width = 100; //100
	paddle_x = width / 2 - paddle_width / 2;
	paddle_y = height - 25;
	paddle_height = 15;

	ball_diameter = 20;
	ball_dx = 1; //1
	ball_dy = 2; //2

	paddle_dx = 3;

	ball_x = width / 2 - ball_diameter / 2;
	ball_y = height / 2 - ball_diameter / 2;

	brickWidth = 50;
	brickRowCount = 3;
	brickColCount = 5;
	brickPadding = 20;
	brickHeight = 20;
	for (let c = 0; c < brickColCount; c++) {
		bricks[c] = [];
		for (let r = 0; r < brickRowCount; r++) {
			bricks[c][r] = {
				x: 0,
				y: 0,
				status: true,
				brickColor: "chocolate",
			};
		}
	}
}

function draw() {
	background("black");

	//bounce on hitting side walls
	if (ball_x + ball_diameter / 2 > width || ball_x - ball_diameter / 2 < 0) {
		ball_dx = -ball_dx;
	}

	//game over on hitting floor
	if (ball_y + ball_diameter / 2 > height) {
		if (lives > 0) {
			lives -= 1;
			ball_dy = -ball_dy;
		}
		if (lives == 0) {
			ball_dy = 0;
			ball_dx = 0;
		}
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
		if (paddle_x > 0) {
			paddle_x = paddle_x - paddle_dx;
		}
	}
	if (keyIsDown(RIGHT_ARROW)) {
		if (paddle_x + paddle_width < width) {
			paddle_x = paddle_x + paddle_dx;
		}
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

	circle(ball_x, ball_y, ball_diameter);
	fill("grey");
	rect(paddle_x, paddle_y, paddle_width, paddle_height);
	fill(255, 255, 255);
	// if (brick_status == true) {
	// 	rect(brick_x, brick_y, brick_width, brick_height);
	// };
	for (let c = 0; c < brickColCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			//defining the brick matrix
			let brick_x = c * (brickWidth + brickPadding) + 30;
			let brick_y = r * (brickHeight + brickPadding) + 60;
			bricks[c][r].x = brick_x;
			bricks[c][r].y = brick_y;

			bricks[2][2].brickColor = "red";
			bricks[2][0].brickColor = "green";

			if (bricks[c][r].status == true) {
				//brick is hit
				if (
					ball_y + ball_diameter / 2 >= bricks[c][r].y &&
					ball_y + ball_diameter / 2 <=
						bricks[c][r].y + brickHeight &&
					ball_x >= bricks[c][r].x &&
					ball_x <= bricks[c][r].x + brickWidth
				) {
					bricks[c][r].status = false;
					brickCount -= 1;
					if (brickCount == 0) {
						ball_dy = 0;
						ball_dx = 0;
						paddle_dx = 0;
					}
					if (bricks[c][r].brickColor == "red") {
						score -= 2;
						brickCount += 1;
					} else if (bricks[c][r].brickColor == "green") {
						score += 5;
					} else {
						score += 1;
					}
					ball_dy = -ball_dy;
				}
			}
			//initialise the brick
			if (bricks[c][r].status == true) {
				fill(bricks[c][r].brickColor);
				rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
				fill(255, 255, 255);
			}
		}
	}

	//text formatting
	textSize(14);
	fill(255, 255, 255);
	//displaying the score
	text("Your Score: " + score, 20, 30);
	if (brickCount == 1) {
		fill(0, 255, 0);
		text("Your Score: " + score, 20, 30);
	}
	fill(255, 255, 255);
	//displaying the lives
	text("Lives Remaining: " + lives, width - 150, 30);
	if (lives <= 1) {
		fill(255, 0, 0);
		text("Lives Remaining: " + lives, width - 150, 30);
	}
	fill(255, 255, 255);
	//text("Lives Remaining: " + lives, width - 150, 30);

	if (lives == 0) {
		textSize(36);
		text("Game Over!", 100, 200);
	}
	if (brickCount == 0) {
		textSize(36);
		text("Wohoo!", 140, 200);
	}
}
