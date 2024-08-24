/*dice.ts*/
import { trace, metrics } from '@opentelemetry/api';

const tracer = trace.getTracer('dice-lib');
const meter = metrics.getMeter('dice-lib');
const counter = meter.createCounter('dice-lib.rolls.counter');
const upDownCounter = meter.createUpDownCounter('events.counter');

const valueGuage = meter.createObservableGauge('dice.value');

const workFlowID = Math.random().toString(36).substring(2, 15);

function rollOnce(min: number, max: number) {
    counter.add(1);
    upDownCounter.add(2);
    upDownCounter.add(-1);
    return Math.floor(Math.random() * (max - min) + min);
}

export function rollTheDice(rolls: number, min: number, max: number) {
    const result: number[] = [];
    const jobID = Math.random().toString(36).substring(2, 15);
    for (let i = 0; i < rolls; i++) {
        const runID = Math.random().toString(36).substring(2, 15);
        const value = rollOnce(min, max)
        // 変数のコールバックとして最後の1つだけ登録される。addというよりはsetに近い
        // 第二引数のlabelが同じだと上書きされそう。labelを変えれば全部登録できるはず
        // 常時実行する場合はcallbackが消えないので、メモリリークの原因になる。Job系のシステムなら問題なさそう。本当はお掃除が必要
        valueGuage.addCallback((result) => {
            result.observe(value, { workFlowID, jobID, runID });
        });
        result.push(value);
    }
    return result;
}
