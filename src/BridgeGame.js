const Bulider = require('./Builder.js');

class BridgeGame {
  #bridge;
  #movementLogs;
  #tryCount;

  constructor() {
    this.#movementLogs = [];
    this.#tryCount = 1;
  }

  build(size) {
    const builder = new Bulider();

    this.#bridge = builder.buildBridge(size);
  }

  move(movingDirection) {
    const playerPosition = this.#movementLogs.length; // 필드 round 대체 고민중...
    const isCrossable = this.#bridge.isCrossable(playerPosition, movingDirection);

    this.saveMovementLog(isCrossable, movingDirection);
  }

  saveMovementLog(isCrossable, movingDirection) {
    this.#movementLogs.push({ isCrossable, movingDirection });
  }

  retry() {
    this.#movementLogs = [];
    this.#tryCount += 1;
  }

  isSucceededMove() {
    const lastLog = this.#movementLogs[this.#movementLogs.length - 1];

    return lastLog.isCrossable;
  }

  isEnd() {
    const passedBlockCount = this.#movementLogs.length;
    const isEveryBlockPassed = this.#bridge.isEveryBlockPassed(passedBlockCount);
    const isSucceededMove = this.isSucceededMove();

    return isEveryBlockPassed && isSucceededMove;
  }

  getMovementLogs() {
    return this.#movementLogs;
  }

  getTryCount() {
    return this.#tryCount;
  }
}

module.exports = BridgeGame;
