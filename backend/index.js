const express = require("express");
const app = express();
const port = 3001;
const { db, networks, metrics } = require("./dummyDB");

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/networks", (_, res) => {
  res.json(networks);
});

app.get("/metrics", (_, res) => {
  res.json(metrics);
});

const validateAccount = ({ name, requestMetrics, networkId }) => {
  if (!name) {
    return [false, "Account name must be specified."];
  } else if (!Array.isArray(requestMetrics)) {
    return [false, "Account metrics must be specified."];
  }

  for (const metric of metrics) {
    if (!requestMetrics.some(m => m.id == metric.id)) {
      return [false, `Metric value for ${metric.id} must be specified.`];
    }
  }

  if (!networkId) {
    return [false, "Network id must be specified."];
  }

  if (!networks.find(n => n.id === networkId)) {
    return [false, `Invalid network id: '${networkId}' `];
  }

  return [true, null];
};

app.post("/account", (req, res) => {
  const {
    body: { name, metrics: requestMetrics, networkId },
  } = req;
  const [isAccountValid, validationMessage] = validateAccount({
    name,
    requestMetrics,
    networkId,
  });

  if (isAccountValid) {
    const newAccount = db.postAccount({
      name,
      metrics: requestMetrics,
      networkId,
    });
    res.json(newAccount);
  } else {
    res.status(412).json({ message: validationMessage });
  }
});

const accountExists = accountId =>
  db.getAccounts().some(account => account.id === accountId);

app.put("/account/:id", (req, res) => {
  const {
    body: { name, metrics: requestMetrics, networkId },
    params: { id: accountId },
  } = req;

  if (!accountExists(accountId)) {
    res.status(412).json({ message: `Invalid account id: ${accountId}` });
    return;
  }

  const [isAccountValid, validationMessage] = validateAccount({
    name,
    requestMetrics,
    networkId,
  });

  if (isAccountValid) {
    const updatedAccount = db.putAccount({
      id: accountId,
      name,
      metrics: requestMetrics,
      networkId,
    });
    res.json(updatedAccount);
  } else {
    res.status(412).json({ message: validationMessage });
  }
});

app.delete("/account/:id", (req, res) => {
  
  const {
    params: { id: accountId },
  } = req;
  
  if (!accountExists(accountId)) {
    res.status(412).json({ message: `Invalid account id: ${accountId}` });
    return;
  }

  db.deleteAccount(accountId);
  res.end();
});

app.get("/accounts", (_, res) => {
  res.json(db.getAccounts());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
