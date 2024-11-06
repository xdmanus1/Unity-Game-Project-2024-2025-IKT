import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Gamepad, Info, ChevronRight, X } from 'lucide-react';

const GameDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3); // Add player health
  const [showInstructions, setShowInstructions] = useState(false);
  const [lasers, setLasers] = useState<{ x: number; y: number }[]>([]); // Player lasers
  const [enemies, setEnemies] = useState<{ x: number; y: number; width: number; height: number; color: string; speed: number }[]>([]);

  useEffect(() => {
    if (gameStarted && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animationFrameId: number;

      // Player
      const player = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 20,
        height: 20,
        color: '#00FFFF',
        speed: 5,
      };

      // Game loop
      const gameLoop = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw starfield background
        drawStarfield(ctx, canvas.width, canvas.height);

        // Draw and move player
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Draw lasers
        lasers.forEach((laser, index) => {
          ctx.fillStyle = '#00FF00'; // Laser color
          ctx.fillRect(laser.x, laser.y, 5, 10);
          laser.y -= 7; // Move laser up

          // Remove lasers that go off-screen
          if (laser.y < 0) lasers.splice(index, 1);
        });

        // Draw and move enemies
        enemies.forEach((enemy, index) => {
          ctx.fillStyle = enemy.color;
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
          enemy.y += enemy.speed;

          // Remove enemies that are off-screen
          if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
            setScore((prevScore) => prevScore + 1); // Increment score
          }

          // Check for collision with player
          if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
          ) {
            setHealth((prevHealth) => prevHealth - 1); // Reduce health on collision
            enemies.splice(index, 1);
            if (health <= 1) setGameStarted(false); // Game over when health runs out
          }

          // Check for collision with lasers
          lasers.forEach((laser, laserIndex) => {
            if (
              laser.x < enemy.x + enemy.width &&
              laser.x + 5 > enemy.x &&
              laser.y < enemy.y + enemy.height &&
              laser.y + 10 > enemy.y
            ) {
              enemies.splice(index, 1); // Remove enemy
              lasers.splice(laserIndex, 1); // Remove laser
              setScore((prevScore) => prevScore + 5); // Increment score on hit
            }
          });
        });

        // Spawn new enemies
        if (Math.random() < 0.03) {
          enemies.push({
            x: Math.random() * (canvas.width - 20),
            y: 0,
            width: 20,
            height: 20,
            color: '#FF0000',
            speed: 2 + Math.random() * 3,
          });
        }

        animationFrameId = requestAnimationFrame(gameLoop);
      };

      gameLoop();

      // Handle keyboard input
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowLeft':
            player.x = Math.max(0, player.x - player.speed);
            break;
          case 'ArrowRight':
            player.x = Math.min(canvas.width - player.width, player.x + player.speed);
            break;
          case 'Space': // Shoot lasers on Spacebar press
            setLasers((prevLasers) => [
              ...prevLasers,
              { x: player.x + player.width / 2 - 2.5, y: player.y },
            ]);
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [gameStarted, health, lasers, enemies]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setHealth(3); // Reset health on start
    setLasers([]); // Clear lasers
    setEnemies([]); // Clear enemies
  };

  const drawStarfield = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.random() + ')';
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto relative"
      >
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-400">Quantum Vendetta Demo</h1>

        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative">
            <canvas ref={canvasRef} width={800} height={600} className="bg-gray-800 rounded-lg shadow-lg mb-4" />
            {!gameStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-xl transition duration-300 flex items-center"
                  onClick={startGame}
                >
                  Start Game
                  <ChevronRight className="ml-2" />
                </motion.button>
              </motion.div>
            )}
          </div>
          {gameStarted && (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 bg-gray-800 bg-opacity-80 p-2 rounded-lg"
              >
                <p className="text-xl font-bold">Score: {score}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 right-4 bg-gray-800 bg-opacity-80 p-2 rounded-lg"
              >
                <p className="text-xl font-bold">Health: {health}</p>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Instructions and About Sections */}
      {/* Game Instructions Modal (if needed) */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Game Instructions</h2>
                <button onClick={() => setShowInstructions(false)} className="text-gray-400 hover:text-white">
                  <X />
                </button>
              </div>
              <p>Use the arrow keys to move and spacebar to shoot lasers. Avoid enemies and try to survive as long as possible!</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameDemo;
