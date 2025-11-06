import styles from "./Home.module.css";
import BusinessCard from "../../components/businessCard/BusinessCard";
import CategoriesList from "../../components/categoriesList/CategoriesList";
import DiscountForm from "../../components/discountForm/DiscountForm";
import SectionHeading from "../../ui/sectionHeanding/SectionHeading";
import ProductsList from "../../components/productsList/ProductsList";

function Home() {
  return (
    <>
      <BusinessCard />
      <div className={styles.container}>
        <SectionHeading
          title="Categories"
          to="/categories"
          buttonText="All categories"
        />
        <CategoriesList limit={4} />
        <DiscountForm />
        <SectionHeading title="Sale" to="/sales" buttonText="All sales" />
        <ProductsList
          limit={4}
          filters={{ discountOnly: true, sortBy: "discountDesc" }}
        />
      </div>
    </>
  );
}

export default Home;
