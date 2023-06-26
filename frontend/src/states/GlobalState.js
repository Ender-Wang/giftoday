// This file contains functions to get and set the global state of the application

// Getters
export function getUserID() {
  return localStorage.getItem("userID");
}

export function getLoggedInDate() {
  return localStorage.getItem("loggedInDate");
}

export function getSearchContent() {
  return localStorage.getItem("searchContent");
}

// Setters
export async function setSearchContent(content) {
  try {
    await localStorage.setItem("searchContent", content);
    return true;
  } catch (err) {
    console.log("Error setting searchContent:", err);
    return false;
  }
}

// Setters
export async function setUserID(userID) {
  try {
    await localStorage.setItem("userID", userID);
    return true;
  } catch (err) {
    console.log("Error setting userID:", err);
    return false;
  }
}

export async function setLoggedInDate() {
  const loggedInDate = new Date();
  try {
    await localStorage.setItem(
      "loggedInDate",
      loggedInDate.toLocaleDateString("en-GB")
    );
    return true;
  } catch (err) {
    console.log("Error setting loggedInDate:", err);
    return false;
  }
}

export async function removeUserID() {
  try {
    await localStorage.removeItem("userID");
    return true;
  } catch (err) {
    console.log("Error removing userID:", err);
    return false;
  }
}

export async function removeSearchContent() {
  try {
    await localStorage.removeItem("searchContent");
    return true;
  } catch (err) {
    console.log("Error removing searchContent:", err);
    return false;
  }
}
