import Layout from "@/components/Layout";
import { API_URL_HOST } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from 'next/link';

export default function Home({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL_HOST}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: {
      events
    }
  }
}
