import moonIcon from "../assets/moon.svg";
import sunIcon from "../assets/sun.svg";

function ThemeToggle({ lightMode, setLightMode }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <img
        src={moonIcon}
        type="checkbox"

        className={`w-5 h-5 ${lightMode ? " " : " invert "}`}

        checked={lightMode}
        onChange={() => setLightMode(!lightMode)}
      />

      <input
        type="checkbox"
        className="sr-only peer"
        checked={lightMode}
        onChange={() => setLightMode(!lightMode)}
      />

      <div
        className="
      relative
      mx-3
      w-11
      h-6
      bg-slate-500
      rounded-full
      peer
      peer-checked:bg-amber-500
      after:content-['']
      after:absolute
      after:top-[2px]
      after:left-[2px]
      after:bg-white
      after:rounded-full
      after:h-5
      after:w-5
      after:transition-all
      peer-checked:after:translate-x-5
    "
      />

      <img
        src={sunIcon}
        type="checkbox"

        className={`w-5 h-5 ${lightMode ? " " : " invert "}`}

        checked={lightMode}
        onChange={() => setLightMode(!lightMode)}
      />
    </label>
  );
}

export default ThemeToggle;
