exports.handler = async () => {
  console.log('function run');

  const data = {
    name: 'mario',
    age: 36,
    job: 'plumber',
  };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
