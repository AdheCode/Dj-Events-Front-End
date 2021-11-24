import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import {parseCookies} from '@/helpers/index';
import styles from "@/styles/Dashboard.module.css";
import { API_URL_HOST } from "@/config/index";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard({events, token}) {
    const router = useRouter();
    const deleteEvent = async (id) => {
      if (confirm(`Are you sure you want to delete?`)) {
        const res = await fetch(`${API_URL_HOST}/events/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: 'Bearer ' +token
          },
        });
  
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
        } else {
          router.push(`/events`);
        }
      }
    };
    return (
        <Layout title="User Dashboard">
            <ToastContainer />
            <div className={styles.dash}>
                <h1>User Dashboard</h1>
                <h3>My Events</h3>
                {events.map((evt) => (
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
                ))}
            </div>
        </Layout>
    )
}

export default Dashboard

export async function getServerSideProps({req}){
    const {token} = parseCookies(req);

    const res = await fetch(`${API_URL_HOST}/events/me`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    const events = await res.json();

    return {
        props: {events, token},
    }
}
