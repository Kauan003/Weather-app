import styles from "./SearchContainer.module.css"

function SearchContainer() {
    return (
    <div className={styles.SearchContainer}>
        <input type="text" placeholder="City"></input>
    </div>
    )
}
export default SearchContainer;