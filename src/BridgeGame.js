const Bulider = require('./Builder.js');
const {
  DOWNSIDE_SYMBOL,
  UPSIDE_SYMBOL,
  QUIT_TRIGGER,
  RESTART_TRIGGER,
} = require('./constants/condition.js');
const { ERROR_MSG } = require('./constants/message.js');

class BridgeGame {
  #bridge;
  #movementLogs;

  constructor() {
    this.#movementLogs = [];
  }

  build(size) {
    const builder = new Bulider();

    this.#bridge = builder.buildBridge(size);
  }

  move(movingDirection) {
    this.#validateDirection(movingDirection);

    const playerPosition = this.#movementLogs.length; // 필드 round 대체 고민중...
    const isCrossable = this.#bridge.isCrossable(playerPosition, movingDirection);

    this.saveMovementLog(isCrossable, movingDirection);
  }

  saveMovementLog(isCrossable, movingDirection) {
    this.#movementLogs.push({ isCrossable, movingDirection });
  }

  retry(gameCommand) {
    this.#validateGameCommand(gameCommand);
  }

  #validateDirection(direction) {
    if (!direction) throw new Error(ERROR_MSG.emptyInput);

    if (!this.#isValidDirectionSymbol(direction)) {
      throw new Error(ERROR_MSG.invalidDirection);
    }
  }

  #isValidDirectionSymbol(direction) {
    return direction === DOWNSIDE_SYMBOL || direction === UPSIDE_SYMBOL;
  }

  #validateGameCommand(gameCommand) {
    if (!gameCommand) throw new Error(ERROR_MSG.emptyInput);

    if (!this.#isValidTrigger(gameCommand)) {
      throw new Error(ERROR_MSG.inValidTrigger);
    }
  }

  #isValidTrigger(gameCommand) {
    return gameCommand === QUIT_TRIGGER || gameCommand === RESTART_TRIGGER;
  }

  isMoved() {
    const lastLog = this.#movementLogs[this.#movementLogs.length - 1];

    return lastLog.isCrossable;
  }

  getMovementLogs() {
    return this.#movementLogs;
  }
}

module.exports = BridgeGame;
