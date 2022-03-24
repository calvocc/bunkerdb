const { v4: uuidv4 } = require("uuid");
const faker = require("faker");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function shuffleArray(array) {
  const outputArray = array.slice();
  for (let i = outputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
  }
  return outputArray;
}

const networks = [
  { id: "facebook", label: "Facebook", color:'#3b5998' },
  { id: "instagram", label: "Instagram", color:'#d83787'  },
  { id: "twitter", label: "Twitter" , color:'#598dca' },
  { id: "youtube", label: "Youtube" , color:'#ff0102' },
];

const metrics = [
  { id: "reach", label: "Reach" },
  { id: "impressions", label: "Impressions" },
  { id: "views", label: "Views" },
  { id: "publications", label: "Publications" },
];

const generateAccountsForNetwork = network => {

  return new Array(getRandomInt(1, 2)).fill(null).map(() => ({
    id: uuidv4(),
    name: faker.company.companyName(),
    metrics: metrics.map(metric => ({
      id: metric.id,
      value: getRandomInt(0, 500),
    })),
    networkId: network.id,
  }));
};

const initialDB = {
  accounts: shuffleArray(
    networks.map(network => generateAccountsForNetwork(network)).reduce((acc, val) => acc.concat(val), [])
  ),
};

let db = initialDB;

const getAccounts = () => db.accounts;

const postAccount = account => {
  const newAccount = { id: uuidv4(), ...account };
  db.accounts = [...db.accounts, newAccount];
  return newAccount;
};

const putAccount = account => {
  db.accounts = db.accounts.map(_account => {
    if (_account.id === account.id) {
      return account;
    }
    return _account;
  });
  return account;
};

const deleteAccount = accountId => {
  db.accounts = db.accounts.filter(account => account.id !== accountId);
};

exports.db = { getAccounts, postAccount, putAccount, deleteAccount };
exports.networks = networks;
exports.metrics = metrics;
