const { makeBridge } = require('./BridgeMaker.js');
const { generate } = require('./utils/BridgeRandomNumberGenerator.js');

const Bridge = require('./Bridge.js');

class BridgeGame {
  #bridge;
  #movementLogs;
  #tryCount;

  constructor() {
    this.#movementLogs = [];
    this.#tryCount = 1;
  }

  build(size) {
    const directionSymbols = makeBridge(Number(size), generate);

    this.#bridge = new Bridge(directionSymbols);
  }

  move(direction) {
    const playerPosition = this.#movementLogs.length; // 필드 round 대체 고민중...
    const isCrossable = this.#bridge.isCrossable(playerPosition, direction);

    this.saveMovementLog(isCrossable, direction);
  }

  saveMovementLog(isCrossable, direction) {
    this.#movementLogs.push({ isCrossable, direction });
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
