import { useDispatch } from "react-redux";
import { createFilter } from "../reducers/filterSlice";

const FilterComponent = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(createFilter(e.target.value));
  };

  return (
    <div>
      <input type="text" name="filter" onChange={handleFilterChange} />
    </div>
  );
};

export default FilterComponent;
