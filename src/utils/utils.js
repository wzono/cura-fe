import * as config from './config';

export function randomColor() {
  const { colors } = config;
  return colors[Math.round(Math.random() * (colors.length - 1))];
}
