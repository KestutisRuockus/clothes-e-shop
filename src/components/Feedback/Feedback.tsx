import { useState } from "react";
import feedback from "../../data/feedback";

export default function Feedback() {
  const [feedbackIndex, setFeedBackIndex] = useState(0);

  // when click on dot render new comment
  function setActive() {
    return feedback.map((item, index) => (
      <span
        onClick={() => setFeedBackIndex(index)}
        className={`w-4 h-4 rounded-full border-2 border-slate-200 hover:outline hover:outline-offset-1 hover:outline-2 ${
          index === feedbackIndex ? "bg-black" : "bg-slate-300"
        }  transition-all duration-200`}
        key={item.name}
      ></span>
    ));
  }

  // get rating and calculate how many percentages of stars to fill
  function convertRatingToStars() {
    const totalStars = 5;
    // Get percentage
    const starPercentage = (feedback[feedbackIndex].rating / totalStars) * 100;

    // round to nearest 10
    const startPercentageRounded = `${Math.round((starPercentage / 10) * 10)}%`;

    return (
      <div className="stars-outer">
        <div
          className="stars-inner"
          style={{ width: `${startPercentageRounded}` }}
        ></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-8">
      <div className="md:w-3/5 w-4/5 flex flex-col gap-4 items-start p-8 max-[400px]:p-4 rounded-xl bg-slate-100">
        <div className="w-full justify-start items-center max-[400px]:items-start flex max-[400px]:flex-col gap-4">
          <div className="w-16 h-16 rounded-full">
            <img
              className="w-full h-full rounded-full"
              src={feedback[feedbackIndex].img}
              alt="photo"
            />
          </div>
          <div>
            <div className="font-bold font-name text-xl">
              {feedback[feedbackIndex].name}
            </div>
          </div>
        </div>
        <div className="line-clamp-3 min-h-[74px] font-base">
          {feedback[feedbackIndex].comment}
        </div>
        <div className="m-auto">{convertRatingToStars()}</div>
      </div>
      <div className="flex gap-2 my-2 cursor-pointer">{setActive()}</div>
    </div>
  );
}
