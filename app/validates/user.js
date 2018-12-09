module.exports = {
  username: {
    type: 'string',
    max: 16,
    format: /^[a-zA-Z][a-zA-Z0-9_]*$/,
    required: true,
  },
  password: {
    type: 'string',
    max: 16,
    min: 5,
    format: /^[a-zA-Z0-9_]*$/,
    required: true,
  },
}
