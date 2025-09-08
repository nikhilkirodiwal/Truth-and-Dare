import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaQuestion, FaFire } from "react-icons/fa";

const Game = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const truthApiUrl = import.meta.env.VITE_API_TRUTH_URL;
  const dareApiUrl = import.meta.env.VITE_API_DARE_URL;

  useEffect(() => {
    if (!state || !state.players || !state.rounds) {
      navigate("/");
    }
  }, [state, navigate]);
  if (!state || !state.players || !state.rounds) {
    return null;
  }

  const { players, rounds } = state;

  const [currentRound, setCurrentRound] = useState(1);
  const [turnIndex, setTurnIndex] = useState(0);
  const [scores, setScores] = useState(players.map(() => 0));
  const [stats, setStats] = useState(
    players.map(() => ({
      truths: 0,
      dares: 0,
      completed: 0,
      failed: 0,
    }))
  );
  const [question, setQuestion] = useState(null);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentPlayer = players[turnIndex];

  const fetchQuestion = async (option) => {
    try {
      setLoading(true);
      setQuestion(null);
      setType(option);

      const endpoint =
        option === "truth"
          ? truthApiUrl
          : dareApiUrl;

      const res = await fetch(endpoint);
      const data = await res.json();

      setQuestion(data.question);
    } catch (err) {
      console.error("Error fetching question:", err);
      setQuestion("⚠ Failed to load question, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResult = (success) => {
    const updatedScores = [...scores];
    const updatedStats = [...stats];

    // Increment stats
    if (type === "truth") updatedStats[turnIndex].truths++;
    if (type === "dare") updatedStats[turnIndex].dares++;

    if (success) {
      updatedScores[turnIndex] += type === "truth" ? 10 : 15;
      updatedStats[turnIndex].completed++;
    } else {
      updatedStats[turnIndex].failed++;
    }

    setScores(updatedScores);
    setStats(updatedStats);

    let nextTurn = turnIndex + 1;
    let nextRound = currentRound;

    if (nextTurn >= players.length) {
      nextTurn = 0;
      nextRound++;
    }

    if (nextRound > rounds) {
      navigate("/result", {
        state: { players, scores: updatedScores, stats: updatedStats },
      });
    } else {
      setTurnIndex(nextTurn);
      setCurrentRound(nextRound);
      setQuestion(null);
      setType(null);
    }
  };

  return (
    <div className="px-4 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl md:text-8xl font-bold mb-2 bg-gradient-to-r from-teal-50 to-teal-100 bg-clip-text text-transparent">
        Truth or Dare
      </h1>
      <p className="text-xl mb-2">
        Round {currentRound} of {rounds}
      </p>
      <p className="text-3xl font-semibold mb-4 text-stone-700">
        {currentPlayer}'s Turn
      </p>

      <div className="grid grid-cols-2 gap-4 bg-white/20 backdrop-blur-md rounded-4xl px-10 py-4 mb-10">
        {players.map((player, index) => (
          <span
            key={index}
            className={`px-6 py-2 rounded-full text-lg sm:text-xl font-medium ${
              index === turnIndex
                ? "bg-white/80 text-purple-600 font-bold"
                : "text-white"
            }`}
          >
            {player}: {scores[index]}pts
          </span>
        ))}
      </div>

      {question ? (
        <div className="bg-white text-black px-3 py-6 sm:px-6 sm:py-10 rounded-2xl shadow-lg w-full max-w-lg text-center">
          <div className="flex flex-col items-center gap-2 mb-2 sm:mb-4">
            {type === "truth" ? (
              <FaQuestion size={30} className="text-blue-500" />
            ) : (
              <FaFire size={30} className="text-red-500" />
            )}
            <p className="font-bold text-xl">{currentPlayer}</p>
          </div>
          <p className="text-xl sm:text-2xl mb-6">{question}</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleResult(true)}
              className="text-white flex items-center gap-2 bg-green-500 px-6 py-4 rounded-full font-bold hover:bg-green-600 hover:scale-105 duration-300 cursor-pointer"
            >
              <FaCheck /> Completed ({type === "truth" ? "+10 pts" : "+15 pts"})
            </button>
            <button
              onClick={() => handleResult(false)}
              className="text-white flex items-center gap-2 bg-red-500 px-6 py-4 rounded-full font-bold hover:bg-red-600 hover:scale-105 duration-300 cursor-pointer"
            >
              <FaTimes /> Failed (0 pts)
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-6">
          <button
            onClick={() => fetchQuestion("truth")}
            disabled={loading}
            className={`p-6 sm:p-12 text-4xl font-bold rounded-2xl shadow-lg duration-300 ${
              loading
                ? "bg-blue-300 text-gray-200 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white hover:scale-105 cursor-pointer"
            }`}
          >
            ❓ Truth
          </button>
          <button
            onClick={() => fetchQuestion("dare")}
            disabled={loading}
            className={`p-6 sm:p-12 text-4xl font-bold rounded-2xl shadow-lg duration-300 ${
              loading
                ? "bg-red-300 text-gray-200 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white hover:scale-105 cursor-pointer"
            }`}
          >
            🔥 Dare
          </button>
        </div>
      )}
      <p className="mt-6 text-lg text-gray-200">
        Play responsibly and have fun! 🎉
      </p>
    </div>
  );
};

export default Game;
