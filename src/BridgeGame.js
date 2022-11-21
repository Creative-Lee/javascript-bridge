class BridgeGame {
  #bridge;
  #movementLogs;
  #tryCount;

  constructor(bridge) {
    this.#bridge = bridge;
    this.#movementLogs = [];
    this.#tryCount = 1;
  }

  move(direction) {
    const currentPosition = this.#movementLogs.length;
    const isCrossable = this.#bridge.isCrossable(currentPosition, direction);

    this.saveMovementLog(isCrossable, direction);
  }

  saveMovementLog(isCrossable, direction) {
    this.#movementLogs.push({ isCrossable, direction });
  }

  retry() {
    this.#movementLogs = [];
    this.#tryCount += 1;
  }

  isLatestMoveSucceeded() {
    const lastLog = this.#movementLogs.slice(-1)[0];

    return lastLog.isCrossable;
  }

  isEnd() {
    const passedBlockCount = this.#movementLogs.length;
    const isEveryBlockPassed = this.#bridge.isEveryBlockPassed(passedBlockCount);
    const isLatestMoveSucceeded = this.isLatestMoveSucceeded();

    return isEveryBlockPassed && isLatestMoveSucceeded;
  }

  getMovementLogs() {
    return this.#movementLogs;
  }

  getTryCount() {
    return this.#tryCount;
  }
}

module.exports = BridgeGame;
