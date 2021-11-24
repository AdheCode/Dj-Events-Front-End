import Layout from "@/components/Layout";
import styles from "@/styles/About.module.css";

export default function AboutPage() {
  return (
    <Layout title="About">
        <div className={styles.about}>
            <h4>This website is created by AdheCode</h4>
            <p>Let&apos;s see <a href="https://github.com/AdheCode" target="_blank" rel="noopener noreferrer">https://github.com/AdheCode</a></p>
        </div>
    </Layout>
  );
}