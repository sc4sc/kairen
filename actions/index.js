export function sayHello(message) {
  return {
    type: 'SAY_HELLO',
    payload: {
      message,
    },
  };
}
