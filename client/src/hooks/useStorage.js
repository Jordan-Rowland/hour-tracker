function useStorage(key) {

  function storage() {
    let items = localStorage.getItem(key);
    items = typeof items === 'string' ? items.split("|") : [];
    return items;
  }

  function setStorage(items) {
    if (typeof items === "object") {
      items = items.join("|");
    }
    if (items.length) {
      localStorage.setItem(key, items);
    }
  }

  return [ storage, setStorage ]
}

export default useStorage;