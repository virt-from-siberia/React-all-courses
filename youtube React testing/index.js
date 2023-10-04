const getFullName = (name, surname) => `${name} ${surname}`;

const actualFullName = getFullName("Aleksey", "Elchin");

const expectedFullName = "Aleksey Elchin";

if (actualFullName !== expectedFullName) {
  console.log("TEST FAILED");
} else {
  console.log("TEST PASSED");
}
