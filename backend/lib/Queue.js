import Queue from 'bull';
// import { host, port, db } from "../config/redis";

import { RETURN_TYPES } from '../jobs'
import jobs from '../jobs';


const queues = Object.values(jobs).map((job) => ({
  // bull: new Queue(job.key, redisConfig),
  bull: new Queue(job.key, 'redis://sinf_redis:6379/0'),
  // bull: new Queue(job.key, `redis://${host}:${port}/${db}`),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find((q) => q.name === name);

    console.log("ADD\t" ,data)

    return queue.bull.add(data, queue.options);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('completed', (job, err) => {
        switch (job.returnvalue) {
          case RETURN_TYPES.END_SUCCESS:
            queue.bull.removeRepeatable(job.name, job.options) // TODO: TEST
            break;
          case RETURN_TYPES.END_TRIGGER_FAIL:
            // log trigger fail
            break;
          case RETURN_TYPES.END_ACTION_FAIL:
            // log action fail
            break;
        }
      })

      queue.bull.on('failed', async (job, err) => {
        console.log('Job failed', queue.key, job.data);
        console.log(err);

        //console.log(job)
        //console.log(job.toKey())
        //queue.bull.removeRepeatableByKey((await queue.bull.getRepeatableJobs()).map(({ key }) => key));
        //console.log((await queue.bull.getRepeatableJobs()).map( ({key}) => key));
      });
    });
  },
};
