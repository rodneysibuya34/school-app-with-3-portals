export function generateUsername(name: string, existingUsernames: string[]): string {
  const parts = name.toLowerCase().split(" ");
  let baseUsername = "";
  
  if (parts.length >= 2) {
    baseUsername = parts[0][0] + "." + parts[parts.length - 1];
  } else {
    baseUsername = parts[0].substring(0, 6);
  }
  
  let username = baseUsername;
  let counter = 1;
  
  while (existingUsernames.includes(username)) {
    counter++;
    username = baseUsername + counter;
  }
  
  return username;
}

export function generatePassword(name: string, school: string, year: number = 2026): string {
  const parts = name.split(" ");
  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  
  const schoolCode = school.split(" ")[0].toUpperCase().substring(0, 3);
  
  const firstLetter = firstName[0].toUpperCase();
  const lastFirst = lastName[0].toUpperCase();
  
  const randomNum = Math.floor(Math.random() * 900) + 100;
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[new Date().getMonth()];
  
  const password = `${firstLetter}${lastFirst}@${schoolCode}${randomNum}${month}`;
  
  return password;
}

export function checkDuplicateUser(users: { name: string; email: string }[], name: string, email: string): boolean {
  return users.some(u => u.name === name || u.email === email);
}

export function getInitials(name: string): string {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
}