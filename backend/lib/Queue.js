import Queue from 'bull';
// import { host, port, db } from "../config/redis";

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

    return queue.bull.add(data, queue.options);
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.key, job.data);
        console.log(err);
      });
    });
  },
};
