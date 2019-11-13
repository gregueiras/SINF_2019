function register(Model) {
  Object.defineProperties(Model, {
    createdAtColumn: {
      get: () => null,
    },
    updatedAtColumn: {
      get: () => null,
    },
  });
}

const NoTimestamp = {
  register,
};

module.exports = NoTimestamp;
