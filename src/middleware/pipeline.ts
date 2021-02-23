const pipeline = (context: any, middleware: Function[], index: number) => {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return (...args: any[]) => {
    context.next(...args);
    const nextPipeline = pipeline(
      context, middleware, index + 1,
    );

    nextMiddleware({ ...context, next: nextPipeline });
  };
};

export default pipeline;
