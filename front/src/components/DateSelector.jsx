import rightArrow from "../assets/right-arrow.svg";
import leftArrow from "../assets/left-arrow.svg";

function DateSelector({ selectedDate, setSelectedDate , lightMode}) {
    const formatDate = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    };

    const goToPreviousDay = () => {
        const date = new Date(selectedDate);

        date.setDate(date.getDate() - 1);

        setSelectedDate(formatDate(date));
    };


    const goToNextDay = () => {
        const date = new Date(selectedDate);

        date.setDate(date.getDate() + 1);

        const nextDate = formatDate(date);
        const today = formatDate(new Date());

        if (nextDate <= today) {
            setSelectedDate(nextDate);
        }
    };


    return (
        <div className="date-selector">
            <button
                className="date-nav-button"
                onClick={goToPreviousDay}
            >
                <img
                    src={leftArrow}
                    className={`w-5 h-5 ${lightMode ? " " : " invert "}`}
                />
            </button>

            <input
                className="date-picker"
                type="date"
                value={selectedDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                    setSelectedDate(e.target.value)
                }
            />



            <button
                className="date-nav-button"
                onClick={goToNextDay}
            >
                <img
                    src={rightArrow}
                    className={`w-5 h-5 ${lightMode ? " " : " invert "}`}
                />
            </button>
        </div>
    );
}

export default DateSelector;