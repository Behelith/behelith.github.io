function random(min, max) {
  return max > min
    ? Math.random() * (max - min) + min
    : Math.random() * (min - max) + max;
}

export { random };
