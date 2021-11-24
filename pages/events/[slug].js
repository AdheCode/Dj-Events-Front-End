import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";
import { API_URL_HOST } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";

function EventPage({ evt }) {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats?.medium?.url ?? evt.image.url}
              width={960}
              height={600}
              alt="..."
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <EventMap evt={evt} />

        <Link href="/events">
          <a className={styles.back}>{`<`} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export default EventPage;

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL_HOST}/events`);
//   const events = await res.json();

//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL_HOST}/events?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL_HOST}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    }
  };
}
