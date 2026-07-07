import { motion } from "framer-motion";

function Card({ Maintitle, content, selectedDate }) {
  return (
    <motion.div
        className="gospel-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
      {content.TextDate != selectedDate && (
        <div className="gospel-subtext">{content.Type} indisponible pour le jour sélectionné.
        Veuillez sélectionner un autre jour.
        <br />
        {content.Type} du {content.TextDate}
        </div>
      )}
        {/* Main Title */}
        <h3 className="gospel-title">{Maintitle}</h3>
        
        {/* Gospel Intro */}
        {content && content.intro && (
          <p className="gospel-subtext">{content.intro}</p>
        )}

        {/* Gospel Content */}
        {content && content.text && (
          <div
            className="gospel-content"
            dangerouslySetInnerHTML={{ __html: content.text }}
          />
        )}
        {content && !content.text && (
          <p className="gospel-subtext">{content}</p>
        )}
      </motion.div>
  );
}

export default Card;