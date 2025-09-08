import { useLocation, useNavigate } from "react-router-dom";
import { FaMedal, FaCheck, FaTimes, FaQuestion, FaFire } from "react-icons/fa";
import { useEffect } from "react";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !state.players || !state.scores || !state.stats) {
      navigate("/");
    }
  }, [state, navigate]);
  if (!state || !state.players || !state.scores || !state.stats) {
    return null;
  }

  const { players, scores, stats } = state;
  const results = players.map((player, index) => ({
    name: player,
    score: scores[index],
    truths: stats?.[index]?.truths ?? 0,
    dares: stats?.[index]?.dares ?? 0,
    completed: stats?.[index]?.completed ?? 0,
    failed: stats?.[index]?.failed ?? 0,
  }));
  results.sort((a, b) => b.score - a.score);
  const winner = results[0];
  return (
    <div className="px-5 py-3 min-w-full sm:min-w-xs md:min-w-2xl lg:min-w-4xl flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl text-center px-8 py-4">
        <div className="flex flex-col items-center mb-2 sm:mb-6">
          <div className="bg-yellow-400 w-15 h-15 rounded-full hidden sm:flex items-center justify-center shadow-lg">
            <FaMedal size={30} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-700 mt-4">
            🎉 Game Over! 🎉
          </h1>
          <p className="mt-2 sm:mt-3 text-xl sm:text-3xl font-semibold text-stone-700">
            {winner.name} Wins!
          </p>
          <p className="text-gray-500 text-lg sm:text-xl">
            With a Score of {winner.score} Points
          </p>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800">
          Final Results
        </h2>

        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
          {results.map((player, i) => (
            <div
              key={i}
              className={`border-2 rounded-2xl px-6 py-4 text-left ${
                i === 0 ? "border-yellow-400 bg-yellow-50" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  {i === 0 && "🥇"}
                  {i === 1 && "🥈"}
                  {i === 2 && "🥉"}
                  {player.name}
                </h3>
                <span className="text-2xl font-bold text-purple-700">
                  {player.score} pts
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <FaQuestion className="text-blue-500 mx-auto mb-1" />
                  <p className="font-semibold">{player.truths}</p>
                  <span className="text-sm text-gray-500">Truths</span>
                </div>
                <div className="bg-pink-50 p-3 rounded-xl">
                  <FaFire className="text-pink-500 mx-auto mb-1" />
                  <p className="font-semibold">{player.dares}</p>
                  <span className="text-sm text-gray-500">Dares</span>
                </div>
                <div className="bg-green-50 p-3 rounded-xl">
                  <FaCheck className="text-green-500 mx-auto mb-1" />
                  <p className="font-semibold">{player.completed}</p>
                  <span className="text-sm text-gray-500">Completed</span>
                </div>
                <div className="bg-red-50 p-3 rounded-xl">
                  <FaTimes className="text-red-500 mx-auto mb-1" />
                  <p className="font-semibold">{player.failed}</p>
                  <span className="text-sm text-gray-500">Failed</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            🔄 Play Again
          </button>
        </div>

        <p className="text-gray-500 mt-4 text-sm">Thanks for playing! 🎮</p>
      </div>
    </div>
  );
};

export default Result;
