// Create admin user for reading and writing data from server
db.createUser({
  user: "admin",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "authStarterDB",
    },
  ],
});

// Create testing data
// User - email: test@gmail.com, username: test, psw: qweqweqwe
let res = [
  db.users.drop(),
  db.users.createIndex({ email: 1 }, { unique: true }),
  db.users.createIndex({ username: 1 }, { unique: true }),
  db.users.insert({
    email: "test@gmail.com",
    username: "test",
    salt: "62a633a7a64abd1909c69aa78259cff1258dd335c8c7a453de09e6801cd46b36",
    hash:
      "fc3042f428d75d266d8cf799536a2d7ed743d0cdab5bb086ad9379caa3f6d136bdcef3e746c4591272886e62e64fd2e6205c3479d257d06bc28f476919e6c6c0d7ee3a91f74eda3b851862baa51c45a666f295993e96e3c98c614af59a80d0857d735d7dd31070e36901309efe25fb81b363684d830545cb75d4787f045da82d10f308332fc0d7bf1b85c0ae5c601025e64f437947dc92ac319c294fb92e38106261ba47d004105afab6ad5a2af3d582a8897dc180ff97cedb775bc90082207387de92a18da293f4831e6efd89277fe128df9d0889c8e16b3e56c7b00bb66805108e7a7996d43b2754c8dcf8540347a67ffee4f8a866311afcfb59efa9c4c35fcd3f089e69fb04e77a2b11a49d904271b890e0e785902ebf11d620cbc7845f1762bc71df7163220e293b122cd6a35ce9d1359057cedb3da8c55bd29fab0261e2886bbf9d7f11d5782a5377be0c5e01b8bf3fe69cb0895d23f5604d08e5d4d09669f4448a1d102696ac053e77d0d413922cda7e4e51d71e606441ffea1bcb1dbe7d777a48548ec2df42a3c8d076f599919cd359fe622ba9a2193d38bb1e13dc2db1827c0ba20e52be3210778bb4fec8a7ae0b7f385a23aeac2592091f645146dc4ebea20efba6ed921871b1dae8841b07670762aa0312156fe02bb7b68ec06b34a7bca1ee4d2276483915eb753580afc20467abccbea9c506c118f290756c5fe7",
    createdAt: ISODate("2020-01-01T00:00:00.174Z"),
    updatedAt: ISODate("2020-01-01T00:00:00.174Z"),
  }),
];
printjson(res);
