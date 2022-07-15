import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const salt: string = bcrypt.genSaltSync();

  return bcrypt.hashSync(password, salt);
};

export const validatePassword = (password: string, hashPassword: string) => {
  return bcrypt.compareSync(password, hashPassword);
};
