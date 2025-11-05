import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./ProductFilter.module.css";
import CustomCeckbox from "../customCheckbox/CustomCeckbox";

const ProductFilter = (filters, onChange, hideDiscount = false) => {
  const handleChange = (field) => (event) => {
    const value =
      field === "discoundOnly" ? event.target.checked : event.target.value;
    onChange({ ...filters, [field]: value });
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems="center"
      mb={5}
      sx={{
        flexWrap: "wrap",
        rowGap: "10px",
        "@media (max-width: 768px": {
          justifyContent: "space-around",
          gap: "10px",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        className={styles.priceForm}
      >
        <Typography className={styles.filterLable}>Price</Typography>
        <TextField
          className={styles.input}
          size="small"
          type="number"
          placeholder="from"
          value={filters.minPrice}
          onChange={handleChange("minPrice")}
        />
        <TextField
          className={styles.input}
          size="small"
          type="number"
          placeholder="to"
          value={filters.maxPrice}
          onChange={handleChange("maxPrice")}
          sx={{
            "& .MuiInputBase-input::placeholder": {
              color: "#8b8b8b",
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: 1.3,
              opacity: 1,
            },
          }}
        />
      </Stack>
      {!hideDiscount && (
        <FormControlLabel
          control={
            <CustomCeckbox
              checked={filters.discoundOnly}
              onChange={handleChange("discountOnly")}
            />
          }
          label="Discounted items"
          labelPlacement="start"
          sx={{
            mt: "0 !important",
            "& .MuiFormControlLabel-label": {
              color: "#282828",
              fontFamily: "Montserrat",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: 1.3,
              marginLeft: "24px",
              marginRight: "7px",
            },
            "& .MuiTopography-root": {
              margin: 0,
              marginLeft: "24px",
            },
          }}
        />
      )}
      <FormControl
        size="small"
        sx={{
          mt: "0 !import",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "#282828",
            fontFamily: "Montserrat",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: 1.3,
            marginLeft: "15px",
          }}
        >
          Sorted
        </Typography>
        <Select
          value={filters.sortBy}
          onChange={handleChange("sortBy")}
          displayEmpty
          sx={{
            minWidth: 160,
            fontFamily: "Montserrat",
            fontSize: "16px",
            fontWeight: 500,
            color: "#282828",
          }}
        >
          <MenuItem value="default">by default</MenuItem>
          <MenuItem value="priceDesc">price: high-low</MenuItem>
          <MenuItem value="priceAsc">price: low-high</MenuItem>
          <MenuItem value="discountDesc">discount: high-low</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default ProductFilter;
