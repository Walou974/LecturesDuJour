import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import VerseCard from "./components/VerseCard";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import Card from "./components/Card";
import DateSelector from "./components/DateSelector";


function App() {
  const [readings, setReadings] = useState([]);
  const [currentReading, setCurrentReading] = useState(0);

  const [verse, setVerse] = useState(null);


  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );



  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [lightMode, setLightMode] = useState(
    localStorage.getItem("theme") === "light"
  );

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  const [showVerse, setShowVerse] = useState(false);

  /* Responsive */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  /* Theme */
  useEffect(() => {
    document.body.className = lightMode ? "light" : "";

    localStorage.setItem(
      "theme",
      lightMode ? "light" : "dark"
    );
  }, [lightMode]);

  /* API Base URL */
  const API_BASE_URL = import.meta.env.VITE_API_PROXY || "https://lecturesdujour.onrender.com";

  /* Load data */
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        console.log(selectedDate);

        // Nettoyage de l'URL pour éviter les doubles slashes (//)
        const baseUrl = API_BASE_URL.replace(/\/$/, "");

        const [readingsResponse, verseResponse] =
          await Promise.all([
            fetch(`${baseUrl}/lectures.php?date=${selectedDate}`),
            fetch(`${baseUrl}/verse.php?date=${selectedDate}`),
          ]);

        if (!readingsResponse.ok) {
          throw new Error(
            `Erreur lectures : ${readingsResponse.status}`
          );
        }

        if (!verseResponse.ok) {
          throw new Error(
            `Erreur verset : ${verseResponse.status}`
          );
        }

        const readingsData =
          await readingsResponse.json();

        const verseData =
          await verseResponse.json();
        console.log(readingsData);

        setReadings(readingsData);
        setCurrentReading(0);

        setVerse(verseData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [selectedDate]);

  /* Document title */
  useEffect(() => {
    if (readings.length > 0) {
      document.title =
        `${readings[currentReading].title}`;
    }
  }, [readings, currentReading]);

  if (
    loading ||
    readings.length === 0 ||
    !verse
  ) {

    return (
      <div className="app-container">
        <Header />

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <ThemeToggle
            lightMode={lightMode}
            setLightMode={setLightMode}
          />
          </div>
          <div>
            <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} lightMode={lightMode} />

          </div>

          <div className="reading-selector">
            {readings.map((reading, index) => (
              <button
                key={index}
                className={
                  currentReading === index
                    ? "reading-tab active"
                    : "reading-tab"
                }
                onClick={() =>
                  setCurrentReading(index)
                }
              >
                {reading.DisplayedLabel}
              </button>
            ))}
          </div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              mainTitle="Chargement..."
              content="Récupération des lectures du jour..."
              selectedDate={selectedDate}
            />
          </motion.div>
        </div>
        );
  }

        if (error) {
    return (
        <div className="app-container">
          <Header />

          <Card
            mainTitle="Erreur"
            content={error}
            selectedDate={selectedDate}
          />
        </div>
        );
  }

        return (
        <div className="app-container">
          <Header />

          <div
            style={{
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            <ThemeToggle
              lightMode={lightMode}
              setLightMode={setLightMode}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} lightMode={lightMode} />

          </div>
          <div className="reading-selector">
            {readings.map((reading, index) => (
              <button
                key={index}
                className={
                  currentReading === index
                    ? "reading-tab active"
                    : "reading-tab"
                }
                onClick={() =>
                  setCurrentReading(index)
                }
              >
                {reading.DisplayedLabel}
              </button>
            ))}
          </div>


          <Card
            mainTitle={readings[currentReading].title}
            content={readings[currentReading]}
            selectedDate={selectedDate}
          />

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} lightMode={lightMode} />

          </div>

          <VerseCard
            title={verse.title}
            verse={verse.text}
            verseRef={verse.ref}
            isMobile={isMobile}
            showVerse={showVerse}
            setShowVerse={setShowVerse}
            lightMode={lightMode}
          />
        </div>
        );
}

        export default App;