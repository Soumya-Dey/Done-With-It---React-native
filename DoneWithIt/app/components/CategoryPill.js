import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CategoryPill = ({
  category,
  filterProductsByCategory,
  clearProductFilter,
}) => {
  const [active, setActive] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.2}
      style={{
        ...styles.categoryPill,
        backgroundColor: active ? "#1dd1a1" : "#ffffff",
      }}
      onPress={() => {
        setActive(!active);
        active
          ? clearProductFilter()
          : filterProductsByCategory({ category: category.toLowerCase() });
      }}
    >
      <Text style={{ color: active ? "#ffffff" : "#202020" }}>{category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    paddingBottom: 10,
    height: 34,
    marginRight: 8,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#eee",
  },
});

export default CategoryPill;
