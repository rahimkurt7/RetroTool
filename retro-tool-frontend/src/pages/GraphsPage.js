import React, { useState } from "react";
import GraphArea from "../components/GraphArea";
import FilterBar from "../components/FilterBar";

const GraphPage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSprints, setSelectedSprints] = useState([]);

  return (
    <div style={styles.container}>
      <h2>Grafik Sayfası</h2>
      <FilterBar
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedSprints={selectedSprints}
        setSelectedSprints={setSelectedSprints}
      />
      <GraphArea
        selectedUsers={selectedUsers}
        selectedCategories={selectedCategories}
        selectedSprints={selectedSprints}
      />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
};

export default GraphPage;
