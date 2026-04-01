const bcrypt = require("bcryptjs");

async function testBcrypt() {
  try {
    console.log("Testing bcryptjs...");
    const password = "testpassword123";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log("Hash generated:", hash);
    const isMatch = await bcrypt.compare(password, hash);
    console.log("Password match:", isMatch);
    console.log("Bcrypt test passed!");
  } catch (err) {
    console.error("Bcrypt test failed:", err);
  }
}

testBcrypt();
