const package = require('../package.json');

const validateToken = (token) => {
  // read author from package.json
  if (token === package.author) {
    return true;
  }
  return false;
}

const customAuthor = ()  => ({
  name: 'Ezequiel M.',
  lastname: 'Benitez',
});

const resolvePicture = (item, type='item') => {
  if (type === 'item') {
    const [{ secure_url: picture }] = item.pictures || [{}];
    if (picture) {
      return picture;
    }
  } else if (type === 'search') {
    const { thumbnail } = item || {};
    if (thumbnail) {
      return thumbnail;
    }
  }
};

const cleanItemResponse = (item) => {
  // add custom fields to standar api response
  const [amount, decimals] = item.price.toString().split('.');
  const price = {
    currency: item.currency_id,
    amount: parseInt(amount),
    decimals: parseInt(decimals),
  };
  const picture = resolvePicture(item);
  const { free_shipping } = item.shipping || {};
  return {
    ...item,
    price,
    picture,
    free_shipping,
  };
};

const cleanSearchItemResponse = (item) => {
  const thumbnail = resolvePicture(item, 'search');
  return {
    ...cleanItemResponse(item),
    thumbnail,
  };
};

const mapResponse = (items, callback) => items.map(callback);

const countByKey = (arr, key) => {
  const count = arr.reduce((acc, item) => {
    const found = Object.keys(acc).find(field => field === item[key]);
    if (found) {
      const add = acc[item[key]] + 1;
      return {
        ...acc,
        [item[key]]: add,
      }; 
    } else {
      return {
        ...acc,
        [item[key]]: 1,
      }; 
    }
  }, {});
  return count;
};

const getMostDuplicatesByKey = (arr, key) => {
  const count = countByKey(arr, key);
  const mostDuplicates = Object.entries(count).sort((a,b) => {
    return b - a;
  });
  return mostDuplicates.shift();
};

module.exports = {
  validateToken,
  customAuthor,
  cleanItemResponse,
  countByKey,
  getMostDuplicatesByKey,
  mapResponse,
  cleanSearchItemResponse,
}