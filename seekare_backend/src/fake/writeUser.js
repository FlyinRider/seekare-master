// file system module to perform file operations
const dotenv = require('dotenv');
const fs = require('fs');
var faker = require('faker');
 
dotenv.config();

const fakeEmail = process.env.FAKE_USER_EMAIL;
const fakePassword = process.env.FAKE_USER_PASSWORD;
const fakeUserCount = process.env.FAKE_USER_COUNT;

// json data
var jsonObj = {users: []};

for (let i = 0; i < fakeUserCount; i++) {
    const json = {
        email: fakeEmail,
        username: faker.internet.userName(),
        password: fakePassword,
        roleTitle: "user",
        intro: "",
        payment: {
            payroll: "",
            cardtype: "",
            holder: "",
            paid: false,
        },
        medConcerns: [],
        searchHistory: [],
        deactivated: false,
    };
    jsonObj.users.push(json);
}
console.log(jsonObj);
 
// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
console.log(jsonContent);
 
fs.writeFile("fake/fakeUser.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});