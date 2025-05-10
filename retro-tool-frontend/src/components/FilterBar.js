import React, { useState, useEffect } from "react";
import PopupSelect from "./PopupSelect";

const FilterBar = ({
  selectedUsers,
  setSelectedUsers,
  selectedCategories,
  setSelectedCategories,
  selectedSprints,
  setSelectedSprints,
}) => {
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sprintList, setSprintList] = useState([]);

  useEffect(() => {
    // ✅ Kullanıcılar ve sprintler
    fetch("https://localhost:7048/api/card/filters")
      .then((res) => res.json())
      .then((data) => {
        setUserList(data.users || []);
        setSprintList(data.sprints || []);
      })
      .catch((err) => console.error("Kullanıcı/Sprint verileri alınamadı", err));

    // ✅ Kategoriler artık ayrı endpoint’ten geliyor
    fetch("https://localhost:7048/api/card/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategoryList(data || []);
      })
      .catch((err) => console.error("Kategori verileri alınamadı", err));
  }, []);

  return (
    <div style={styles.bar}>
      <PopupSelect
        label="Kullanıcı"
        items={userList}
        selectedItems={selectedUsers}
        onChange={setSelectedUsers}
      />
      <PopupSelect
        label="Kategori"
        items={categoryList}
        selectedItems={selectedCategories}
        onChange={setSelectedCategories}
      />
      <PopupSelect
        label="Sprint"
        items={sprintList}
        selectedItems={selectedSprints}
        onChange={setSelectedSprints}
      />
    </div>
  );
};

const styles = {
  bar: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    padding: "10px 0",
    flexWrap: "wrap",
  },
};

export default FilterBar;
