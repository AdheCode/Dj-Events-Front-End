import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import styles from "@/styles/Form.module.css";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL_HOST } from "@/config/index";
import moment from "moment";
import Image from "next/image";
import {FaImage} from 'react-icons/fa';
import {parseCookies} from "@/helpers/index";

function EditEventPage({evt, token}) {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description,
    });

    const [showModal, setShowModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(evt.image ? (evt.image.formats?.thumbnail.url ?? evt.image.url) : null)

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const hasEmptyField = Object.values(values).some((element) => element === '');
        if (hasEmptyField) {
            toast.error('Please fill in all fields')
        }

        const res = await fetch(`${API_URL_HOST}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +token
            },
            body: JSON.stringify(values)
        })

        if(!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('Unauthorized')    
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

    const imageUploaded = async (e) => {

        const res = await fetch(`${API_URL_HOST}/events/${evt.id}`);
        const data = await res.json();
        setImagePreview(data.image.formats?.thumbnail.url ?? data.image.url);
        setShowModal(false);

    }

    return (
        <Layout title='Edit Event'>
            <Link href='/events'><a>{`<`} Go Back</a></Link>
            <h1>Edit Event</h1>
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
                        <input type="date" id="date" name="date" value={moment(values.date).format('yyyy-MM-DD')} onChange={hundleInputChange} />
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
                    <input type="submit" value="Edit Event" className="btn" />
            </form>

            <h2>Event Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} width={170} height={100} alt="..." />
            ) : 
            <div>
                <p>No image uploaded.</p>
            </div>            
            }

            <div>
                <button onClick={() => setShowModal(true)} type="button" className="btn-secondary">
                    <FaImage /> Set Image
                </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} token={token} />
            </Modal>
        </Layout>
    )
}

export default EditEventPage

export async function getServerSideProps({params:{id}, req}) {
  const res = await fetch(`${API_URL_HOST}/events/${id}`);
  const evt = await res.json();
  const {token} = parseCookies(req);

  return {
    props: {
      evt, token
    }
  }
}
