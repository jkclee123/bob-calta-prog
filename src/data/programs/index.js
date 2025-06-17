// Import all program JSON files
import diceRoll from './dice_roll.json';
import mastermind from './mastermind.json';
import dateDuration from './date_duration.json';
import timerStopwatch from './timer_stopwatch.json';
import timerWithCounter from './timer_with_counter.json';
import pokerDealer from './poker_dealer.json';
import avalon from './avalon.json';

// Export combined programs object
const programs = {
  dice_roll: diceRoll,
  mastermind: mastermind,
  date_duration: dateDuration,
  timer_stopwatch: timerStopwatch,
  timer_with_counter: timerWithCounter,
  poker_dealer: pokerDealer,
  avalon: avalon
};

export default programs; 