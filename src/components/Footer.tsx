import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <hr/>
            <ul className={styles.navItems}>
                <li className={styles.navItem}>
                    CRUD Manager
                </li>
            </ul>
        </footer>
    )
}