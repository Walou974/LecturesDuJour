import { motion } from "framer-motion";
import BibleIcon from "../assets/bible.svg";

function VerseCard({
  title,
  verse,
  verseRef,
  isMobile,
  showVerse,
  setShowVerse,
  lightMode,
}) {
  if (!verse) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <button
          className="verse-fab"
          onClick={() => setShowVerse(true)}
        >
            <img
                src={BibleIcon}
                alt="Bible Icon"
                className={`w-6 h-6 ${lightMode ? " " : " invert "}`}
            />
        </button>
      ) : (
        <div className="verse-card">
          <h4 className="gospel-subtitle">
            {title}
          </h4>

          <span
            className="verse-content"
            dangerouslySetInnerHTML={{
              __html: verse,
            }}
          />

          <span className="gospel-verse-ref">
            ({verseRef})
          </span>
        </div>
      )}

      {showVerse && (
        <div
          className="modal-overlay"
          onClick={() => setShowVerse(false)}
        >
          <motion.div
            className="verse-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="gospel-title">
              Verset du Jour
            </h3>

            <div
              className="verse-content"
              dangerouslySetInnerHTML={{
                __html: verse,
              }}
            />

            <div className="gospel-subtext">
              {verseRef}
            </div>

            <button
              className="close-btn"
              onClick={() => setShowVerse(false)}
            >
              Fermer
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default VerseCard;