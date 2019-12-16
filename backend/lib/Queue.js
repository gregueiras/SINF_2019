import Queue from "bull";
// import { host, port, db } from "../config/redis";

import { RETURN_TYPES } from "../jobs";
import jobs from "../jobs";

const queues = Object.values(jobs).map(job => ({
  // bull: new Queue(job.key, redisConfig),
  bull: new Queue(job.key, "redis://sinf_redis:6379/0"),
  // bull: new Queue(job.key, `redis://${host}:${port}/${db}`),
  name: job.key,
  handle: job.handle,
  options: job.options
}));

queues.forEach(({ bull }) => bull.setMaxListeners(400));

export default {
  queues,
  add(name, data, jobName) {
    const queue = this.queues.find(q => q.name === name);
    

    if (jobName)
      return queue.bull.add(jobName, data, queue.options);
    else
      return queue.bull.add(data, queue.options);
  },
  process() {   
    return this.queues.forEach(queue => {
      queue.bull.process("__default__", 100, queue.handle);
      queue.bull.process(queue.name, 100, queue.handle);
      for (let i = 0; i < 150; i++) {
        queue.bull.process(`${queue.name}_${i}`, 100, queue.handle);

      }
      queue.bull.on("completed", (job, result) => {
        console.log(`Job completed with result ${JSON.stringify(result)}`);
        const { value } = result;
        switch (value) {
          case RETURN_TYPES.END_SUCCESS:
            console.log("SUCCESS");
            break;
          case RETURN_TYPES.END_TRIGGER_FAIL:
            // log trigger fail
            break;
          case RETURN_TYPES.END_ACTION_FAIL:
            // log action fail
            break;
          case RETURN_TYPES.END_NO_NEW_DOCUMENTS:
            // log no new documents found
            break;
        }
      });

      queue.bull.on("failed", async (job, err) => {
        console.log("Job failed", queue.key, job.data);
        console.log(err);

        //console.log(job)
        //console.log(job.toKey())
        //queue.bull.removeRepeatableByKey((await queue.bull.getRepeatableJobs()).map(({ key }) => key));
        //console.log((await queue.bull.getRepeatableJobs()).map( ({key}) => key));
      });
    });
  },
  removeAll() {
    return this.queues.map(({ bull }) => bull.empty());
  }
};
