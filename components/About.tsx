import Stars from "./Stars";
import Logo from "./Logo";

import styles from "./About.module.css";

export default function About() {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <Logo />
            </div>
            <div className="x">
                <h2 className={styles.sectionHeadText}>
                    Hey, I'm <span className={styles.name}>Tulsi Sapkota.</span>
                </h2>

                <p className={styles.aboutText}>
                    I enjoy tralating ideas into programs.
                </p>
            </div>
            <Stars />
        </div>
    );
}
