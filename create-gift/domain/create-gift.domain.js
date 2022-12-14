const { createGiftService } = require('../service/create-gift.service');
const { giftChoser } = require('../helper/gift-chooser.helper');

async function createGiftDomain(eventPayload) {
  const message = JSON.parse(eventPayload.Message);
  const dbParams = {
    ExpressionAttributeNames: {
      '#G': 'gift',
    },
    ExpressionAttributeValues: {
      ':g': giftChoser(message.birth),
    },
    Key: {
      dni: message.dni,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'SET #G = :g',
  };

  console.log('dbParams', dbParams);

  await createGiftService(dbParams);

  return {
    statusCode: 200,
    body: 'Gift added succesfully',
  };
}

module.exports = { createGiftDomain };
