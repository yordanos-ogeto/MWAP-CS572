const fibonacci = (num) => {
  if (num < 0) {
    return 0;
  } else if (num <= 2) {
    return 1;
  } else {
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
};

const promise = (number) => {
  return new Promise((resolve, reject) => {
    if (number < 0) {
      reject("the number must be greater than zero");
    } else {
      resolve(fibonacci(number));
    }
  });
};

promise(-30)
  .then((result) => {
    console.log("fibonacci of 30 is ", result);
  })
  .catch((err) => {
    console.log("the error is ", err);
  });
