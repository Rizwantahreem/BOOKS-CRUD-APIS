const Joi = require("joi");
const { author } = require("../interfaces");

const createBookValidator = (book) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    summary: Joi.string().required(),
  });

  const { error } = schema.validate(book);

  return error
    ? { error: "The book object is not correct", isValid: false }
    : { isValid: true };
};

const updateBookValidator = (book) => {
  const scehma = Joi.object({
    title: Joi.string().optional(),
    author: Joi.string().optional(),
    summary: Joi.string().optional(),
  });

  const { error } = scehma.validate(book);

  return error
    ? { error: "The book object is not correct", isValid: false }
    : { isValid: true };
};

module.exports = {
  createBookValidator,
  updateBookValidator,
};
