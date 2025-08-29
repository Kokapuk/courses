const sleep = (timeMs: number) => {
  return new Promise((res) => setTimeout(res, timeMs));
};

export default sleep;
