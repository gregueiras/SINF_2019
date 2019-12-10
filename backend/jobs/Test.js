import { nextTurn, isMyTurn } from "../services/db";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  key: "Test",
  options: {/*
    repeat: {
      every: 10 * 1000
    }*/
  },
  async handle({ data }, done) {
    const { delay, processID, step } = data;
    
    await sleep(delay * 1000);
    console.log(data);
    console.log("TEST_0");

    const active = await isMyTurn({ processID, step });

    if (active) {
      await nextTurn({ processID });
      done(null, { value: "ACTIVO" });
    } else {
      done(null, { value: "NÃO ACTIVO" });
    }
  }
};
