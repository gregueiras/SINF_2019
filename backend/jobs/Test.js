export default {
  key: 'Test',
  options: {
    delay: 1000,
  },
  async handle({ data }) {
    console.log(data);
    console.log('TEST');
  },
};
