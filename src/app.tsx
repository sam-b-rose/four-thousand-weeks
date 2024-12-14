import type { TargetedEvent } from "preact/compat";
import { useMemo, type Dispatch, type StateUpdater } from "preact/hooks";
import { useSessionStorage } from "./hooks/useSessionStorage";

import "./app.css";

const MAX_DATE = new Date().toISOString().split("T")[0];

export function App() {
  const [date, setDate] = useSessionStorage("date", MAX_DATE);
  const [lifespan, setLifespan] = useSessionStorage("lifespan", "80");
  const totalWeeks = Number(lifespan) * 52;
  const weeksLived = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000 / 60 / 60 / 24 / 7,
  );

  function handleOnChange(updater: Dispatch<StateUpdater<string>>) {
    return (event: TargetedEvent<HTMLInputElement>) => {
      updater(event.currentTarget.value);
    };
  }

  const weeks = useMemo(
    () =>
      Array.from({ length: totalWeeks }, (_, i) => i).map((i) => (
        <div key={i} class={`week ${i < weeksLived ? "lived" : ""}`} />
      )),
    [totalWeeks, weeksLived],
  );

  return (
    <main>
      <section>
        <h1>Four Thousand Weeks</h1>
        <p>
          This is a simple app to help you visualize your time. There are about
          4,000 weeks in the average human life. How many weeks do you have
          left?
        </p>
      </section>
      <section class="layout">
        <div class="field">
          <label for="start">What day were you born?</label>
          <input
            type="date"
            name="start"
            max={MAX_DATE}
            defaultValue={date}
            onChange={handleOnChange(setDate)}
          />
        </div>
        <div class="field">
          <label for="lifespan">How long do you expect to live?</label>
          <input
            type="number"
            name="lifespan"
            min="0"
            max="120"
            defaultValue={lifespan}
            onChange={handleOnChange(setLifespan)}
          />
        </div>
        <div class="grid">{weeks}</div>
      </section>
    </main>
  );
}