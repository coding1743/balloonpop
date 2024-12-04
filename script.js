const gameContainer = document.getElementById("game-container");
    const scoreDisplay = document.getElementById("score");
    const gameOverDisplay = document.getElementById("game-over");
    const popsound = document.getElementById("pop-sound");
    const gameoversound = document.getElementById("game-over-sound");

    let score = 0;
    let gameActive = true;
    let balloonInterval;
    function createBalloon() {
        if (!gameActive) return;
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        // Randomize position
        balloon.style.left = Math.random() * 90 + "%";
        balloon.style.bottom = "-100px";
        // Randomize color
        balloon.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        gameContainer.appendChild(balloon);

        let moveInterval = setInterval(() => {
          if (!gameActive){
            clearInterval(moveInterval)
            balloon.remove()
            return
          }
            let currentBottom = parseInt(window.getComputedStyle(balloon).bottom);
            if (currentBottom >= window.innerHeight) {
              clearInterval(moveInterval);
              gameContainer.removeChild(balloon);
              if (gameActive) {
                gameOver();
              }
            } else {
              balloon.style.bottom = currentBottom + 2 + "px";
            }
          }, 20);
          // Pop balloon on click
          balloon.addEventListener("click", () => {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            balloon.remove();
            clearInterval(moveInterval);
            popsound.currentTime=0;
            popsound.play()
          });
        }

        function gameOver() {
            gameActive = false;
            gameOverDisplay.style.display = "block";
            clearInterval(balloonInterval)
            gameoversound.currentTime=0
            gameoversound.play()
          }
          // Restart game
          function restartGame() {
            score = 0;
            gameActive = true;
            scoreDisplay.textContent = "Score: 0";
            gameOverDisplay.style.display = "none";
            // Clear all balloons
            document.querySelectorAll(".balloon").forEach((balloon) => balloon.remove());
            // Start game again
            startGame();
          }
          // Start game
          function startGame() {
            balloonInterval=setInterval(createBalloon, 1000);
          }
          // Initialize
          startGame();
         