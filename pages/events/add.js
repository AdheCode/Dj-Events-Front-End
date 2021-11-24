import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL_HOST } from "@/config/index";
import {parseCookies} from "@/helpers/index";

function AddEventPage({token}) {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    });

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const hasEmptyField = Object.values(values).some((element) => element === '');
        if (hasEmptyField) {
            toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL_HOST}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +token
            },
            body: JSON.stringify(values)
        })

        if(!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('No token includes')    
                return;            
            }
            toast.error('Something Went Wrong')
        } else {
            const evt = await res.json();
            router.push(`/events/${evt.slug}`)
        }



    }
    const hundleInputChange = (e) => {
        const { name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
        
    }
    return (
        <Layout title='Add New Event'>
            <Link href='/events'><a>{`<`} Go Back</a></Link>
            <h1>Add New Event</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name" className={styles.label}>Event Name</label>
                        <input type="text" id="name" name="name" value={values.name} onChange={hundleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="performers" className={styles.label}>Performers</label>
                        <input type="text" id="performers" name="performers" value={values.performers} onChange={hundleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="venue" className={styles.label}>Venue</label>
                        <input type="text" id="venue" name="venue" value={values.venue} onChange={hundleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="address" className={styles.label}>Address</label>
                        <input type="text" id="address" name="address" value={values.address} onChange={hundleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="date" className={styles.label}>Date</label>
                        <input type="date" id="date" name="date" value={values.date} onChange={hundleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="time" className={styles.label}>Time</label>
                        <input type="text" id="time" name="time" value={values.time} onChange={hundleInputChange} />
                    </div>
                </div>
                    <div>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea type="text" id="description" rows="5" name="description" value={values.description} onChange={hundleInputChange}></textarea>
                    </div>
                    <input type="submit" value="Add Event" className="btn" />
            </form>
            
        </Layout>
    )
}

export default AddEventPage

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req);

    return {
        props: {
            token
        }
    }

}
