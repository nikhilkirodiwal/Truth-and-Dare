import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      {/* Centered Content */}
      <main className="flex flex-col flex-grow items-center justify-center gap-6 text-teal-50">
        <h1 className="text-center font-bold text-5xl sm:text-6xl md:text-8xl bg-gradient-to-r from-teal-50 to-teal-100 bg-clip-text text-transparent">
          Truth and Dare
        </h1>
        <p className="text-lg sm:text-2xl">
          The ultimate party game for friends
        </p>
        <Link
          to="/setup"
          className="px-6 py-4 border-2 rounded-4xl font-bold bg-teal-50 text-purple-700 text-[1rem] flex items-center gap-2 hover:scale-105 duration-300 cursor-pointer"
        >
          <MdOutlinePeopleOutline /> Start Multiplayer Game
        </Link>
        <p className="text-sm">Play responsibly and have fun! 🎉</p>
      </main>

      {/* Footer at Bottom */}
      <footer className="w-full text-center text-[14px] sm:text-lg bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent p-4">
        <p>
          © {new Date().getFullYear()} Truth and Dare App Developed by{" "}
          <span className="font-bold bg-gradient-to-r from-teal-50 to-teal-100 bg-clip-text text-transparent">
            Nikhil Kirodiwal
          </span>
        </p>

        <div className="flex justify-center items-center gap-4 mt-2 text-2xl">
          <a
            href="https://github.com/nikhilkirodiwal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/nikhil-kirodiwal-659933296"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com/nikhil._saini"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Main;
