import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaPlay } from "react-icons/fa";

const Setup = () => {
  const navigate = useNavigate();

   useEffect(() => {
    if (!window.history.state || !window.history.state.idx) {
      navigate("/");
    }
  }, [navigate]);

  const [players, setPlayers] = useState(["", ""]);
  const [rounds, setRounds] = useState(1);

  const handlePlayerChange = (index, value) => {
    const updated = [...players];
    updated[index] = value;
    setPlayers(updated);
  };

  const addPlayer = () => {
    if (players.length < 8) setPlayers([...players, ""]);
  };

  const removePlayer = (index) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const validPlayers = players.filter((p) => p.trim() !== "");
  const uniquePlayers = [...new Set(validPlayers)];
  const hasDuplicates = uniquePlayers.length !== validPlayers.length;

  const startGame = () => {
    if (validPlayers.length < 2 || hasDuplicates) return;
    navigate("/game", { state: { players: validPlayers, rounds } });
  };

  return (
    <div className="px-5 min-h-screen min-w-full sm:min-w-xs md:min-w-2xl lg:min-w-4xl py-2 flex items-center">
      <div className="bg-white w-full rounded-4xl shadow-lg py-4 px-10 text-center">
        <h1 className="text-4xl font-bold mb-1">Setup Players</h1>
        <p className="text-gray-500 mb-6">
          Add players and configure game settings
        </p>

        <div className="flex flex-col gap-3">
          {players.map((player, index) => (
            <div key={index} className="flex items-center gap-2 sm:min-w-md">
              <input
                type="text"
                placeholder={`Player ${index + 1} name`}
                value={player}
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                className="flex-1 border rounded-full px-4 py-2 outline-none text-gray-500 focus:ring-2 focus:ring-purple-400"
              />
              {players.length > 2 && (
                <button
                  onClick={() => removePlayer(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {players.length < 8 && (
            <button
              onClick={addPlayer}
              className="mt-4 w-full border-2 border-dashed rounded-full py-2 text-gray-500 hover:text-purple-600"
            >
              + Add Player ({players.length}/8)
            </button>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl mt-6 p-4 text-left">
          <h2 className="font-semibold mb-2">Game Settings</h2>
          <div className="flex items-center gap-4">
            <span>Rounds per player</span>
            <button
              onClick={() => setRounds((r) => Math.max(1, r - 1))}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <FaMinus size={18} />
            </button>
            <span className="font-bold text-lg">{rounds}</span>
            <button
              onClick={() => setRounds((r) => r + 1)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <FaPlus size={18} />
            </button>
          </div>
        </div>

        <div className="bg-pink-50 rounded-xl mt-6 p-4 text-left text-sm">
          <h2 className="font-semibold mb-2">Scoring System</h2>
          <ul className="space-y-1">
            <li className="text-blue-600">ℹ Truth completed: +10 points</li>
            <li className="text-purple-600">✔ Dare completed: +15 points</li>
            <li className="text-red-600">✖ Failed challenge: 0 points</li>
          </ul>
        </div>

        {validPlayers.length < 2 && (
          <p className="mt-4 text-red-600 font-medium">
            ⚠ Please enter at least 2 player names
          </p>
        )}
        {hasDuplicates && (
          <p className="mt-2 text-red-600 font-medium">
            ⚠ Duplicate player names are not allowed
          </p>
        )}

        <button
          onClick={startGame}
          disabled={validPlayers.length < 2 || hasDuplicates}
          className={`mt-6 w-full flex items-center justify-center gap-2 rounded-full py-3 font-bold hover:scale-105 lg:hover:scale-102 duration-300
            ${
              validPlayers.length < 2 || hasDuplicates
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700  cursor-pointer"
            }`}
        >
          <FaPlay size={18} /> Start Game
        </button>
      </div>
    </div>
  );
};

export default Setup;
