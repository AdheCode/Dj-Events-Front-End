import Layout from "@/components/Layout";
import { API_URL_HOST, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function EventsPage({events, page, total}) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

        <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({query:{page = 1}}) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  const eventTotal = await fetch(`${API_URL_HOST}/events/count`);
  const total = await eventTotal.json();

  const eventRes = await fetch(`${API_URL_HOST}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const events = await eventRes.json();

  return {
    props: {
      events, page: +page, total
    }
  }
}
