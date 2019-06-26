
class BallCollide {
    constructor(options) {
        this.container = document.getElementById(options.container);   // container ID
        this.balls = this.container.querySelectorAll('.balls');  // The ball in the container, the class name is set by yourself
        this.speed = options.speed;  // Ball running speed
        this.ballArr = [];  // Storing a small ball data array
        this.rangeWidth = this.container.offsetWidth;
        this.rangeHeight = this.container.offsetHeight;
        this.ballInit();
    }

    ballInit() {
        //this.ballArr = []; // If you need to initialize the instance without refreshing the page
        for (let i=0; i<this.balls.length; i++) {
            let attrBall = {};
            attrBall.x = this.balls[i].offsetLeft;
            attrBall.y = this.balls[i].offsetTop;
            attrBall.cx = this.balls[i].offsetLeft + this.balls[i].offsetWidth / 2;
            attrBall.cy = this.balls[i].offsetTop + this.balls[i].offsetHeight / 2;
            attrBall.radius = this.balls[i].offsetWidth / 2;
            attrBall.diameter = this.balls[i].offsetWidth;
            attrBall.directionX = Math.round(Math.random());
            attrBall.directionY = Math.round(Math.random());
            attrBall.speed = this.speed;
            attrBall.index = i;
            attrBall.timer = null;
            this.ballArr.push(attrBall);
            this.handleBallMove(this.ballArr[i]);
        }
    }

    /**
     * Small ball movement function
     * @param ball
     */
    handleBallMove(ball) {
        ball.timer = setInterval(() => {
            if (ball.directionX === 1) {
                ball.x += ball.speed;
                if (ball.x + ball.diameter >= this.rangeWidth) {
                    ball.x = this.rangeWidth - ball.diameter;
                    ball.directionX = 0;
                }
            }
            else {
                ball.x -= ball.speed;
                if (ball.x <= 0) {
                    ball.x = 0;
                    ball.directionX = 1;
                }
            }
            if (ball.directionY === 1) {
                ball.y += ball.speed;
                if (ball.y + ball.diameter >= this.rangeHeight) {
                    ball.y = this.rangeHeight - ball.diameter;
                    ball.directionY = 0;
                }
            }
            else {
                ball.y -= ball.speed;
                if (ball.y <= 0) {
                    ball.y = 0;
                    ball.directionY = 1;
                }
            }
            ball.cx = ball.x + ball.diameter / 2;
            ball.cy = ball.y + ball.diameter / 2;
            this.balls[ball.index].style.left = ball.x + "px";
            this.balls[ball.index].style.top = ball.y + "px";
            this.handleBallCollide(ball.index);
        }, 16)
    }

    /**
     * Small ball collide function
     * @param index
     */
    handleBallCollide(index) {
        let someBallcx = this.ballArr[index].cx;
        let someBallcy = this.ballArr[index].cy;
        let someBallRadius = this.ballArr[index].radius;
        // Idea, first take out a small ball and then traverse other small balls to judge the center distance
        for (let i=0; i<this.ballArr.length; i++) {
            if (i !== index) {
                let otherBallcx = this.ballArr[i].cx;
                let otherBallcy = this.ballArr[i].cy;
                let otherBallRadius = this.ballArr[i].radius;
                // Center distance, use Math.sqrt() takes two point-to-point distances
                let distance = Math.sqrt((someBallcx - otherBallcx) * (someBallcx - otherBallcx) + (someBallcy - otherBallcy) * (someBallcy - otherBallcy));
                if (distance <= someBallRadius + otherBallRadius) {
                    someBallcx > otherBallcx ? this.ballArr[index].directionX = 1 : this.ballArr[index].directionX = 0;
                    someBallcy > otherBallcy ? this.ballArr[index].directionY = 1 : this.ballArr[index].directionY = 0;
                }
            }
        }
    }
}