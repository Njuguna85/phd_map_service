import localForage from "localforage";

localForage.config({
  name: "abonten",
  driver: [localForage.INDEXEDDB, localForage.WEBSQL, localForage.LOCALSTORAGE],
  storeName: "abonten",
});

async function savetoLF(key, item) {
  try {
    let value = await localForage.setItem(key, item);
    return value;
  } catch (error) {
    return error;
  }
}

async function getFromLF(key) {
  try {
    let value = await localForage.getItem(key);
    return value;
  } catch (error) {
    return error;
  }
}

async function removeFromLF(key) {
  try {
    await localForage.removeItem(key);
    return true;
  } catch (error) {
    return error;
  }
}

async function clearLF() {
  try {
    await localForage.clear();
    return true;
  } catch (error) {
    return error;
  }
}

export { savetoLF, getFromLF, removeFromLF, clearLF };
