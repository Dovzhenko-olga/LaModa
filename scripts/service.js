// request data base

const getData = async (server) => {
  const data = await fetch(server);
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`)
  }
}

const getGoods = (cb, prop, value) => {
  getData('db.json')
  .then(data => {
      if (value) {
        cb(data.filter(item => item[prop] ===value ));
      } else {
        cb(data);
      }
    })
    .catch(err => {
      console.error(err);
    });
}
export default getGoods;