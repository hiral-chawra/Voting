const { sequelize } = require('./src/models'); // adjust if needed
const User = require('./src/models/User');

async function createUser() {
    await sequelize.sync();

    await User.create({
        voterId: "V001",
        aadharNo: "123456789012",
        name: "Test User",
        email: "test@mail.com",
        gender: "male",
        mobileNo: "9999999999",
        password: "123456",   // hook will hash this automatically
        role: "voter"
    });

    console.log("User created");
}

createUser();