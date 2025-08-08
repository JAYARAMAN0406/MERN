
function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatDate(dob) {
  const date = new Date(dob);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatPerson(person = {}) {
  return {
    id:person._id || "",
    fullName: `${capitalize(person.firstName || "")} ${capitalize(person.lastName || "")}`,
    email: person.email || "",
    gender: capitalize(person.gender || ""),
    dob: person.dob ? formatDate(person.dob) : "",
    phone:person.phone || ""
  };
}

module.exports = { formatPerson };
