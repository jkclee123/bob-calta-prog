// Import all program JSON files
import diceRoll from './dice_roll.json';
import mastermind from './mastermind.json';
import dateDuration from './date_duration.json';
import timerStopwatch from './timer_stopwatch.json';
import timerWithCounter from './timer_with_counter.json';
import pokerDealer from './poker_dealer.json';
import avalon from './avalon.json';
import trigonometry from './trigonometry.json';

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

export default programs; 