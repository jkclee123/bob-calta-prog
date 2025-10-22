// Import all program JSON files
import diceRoll from './dice_roll.json';
import mastermind from './mastermind.json';
import dateDuration from './date_duration.json';
import timerStopwatch from './timer_stopwatch.json';
import timerWithCounter from './timer_with_counter.json';
import pokerDealer from './poker_dealer.json';
import avalon from './avalon.json';
import trigonometry from './trigonometry.json';

// Import program images
import { programImages } from '../../assets/programImages';

// Helper function to resolve images
function withResolvedImages(programs) {
  const resolved = {};
  for (const [id, program] of Object.entries(programs)) {
    const set = programImages[id] || {};
    // Prefer webp; fallback to png; fallback to original string (transition safety)
    const primary = set.webp || set.png || program.image;
    const guidePrimary = set.webp || set.png || (program.guide?.image ?? null);

    resolved[id] = {
      ...program,
      imageSet: { webp: set.webp, png: set.png },
      image: primary,
      guide: {
        ...program.guide,
        image: guidePrimary,
      },
    };
  }
  return resolved;
}

// Export combined programs object
const programs = {
  avalon: avalon,
  date_duration: dateDuration,
  dice_roll: diceRoll,
  mastermind: mastermind,
  poker_dealer: pokerDealer,
  timer_stopwatch: timerStopwatch,
  timer_with_counter: timerWithCounter,
  trigonometry: trigonometry,
};

const programsWithImages = withResolvedImages(programs);
export default programsWithImages; 