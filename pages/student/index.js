import Head from 'next/head'
import Image from 'next/image';
import Navbar from '../../components/Navbar'
import styles from '../../styles/student_faculty.module.css'
import ScrollToTop from "react-scroll-to-top";
import UserCard from '@/components/usercard'
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import StudentGrid from '@/components/StudentGrid';
import { useEffect, useState } from 'react';
// import StudentData from '@/assets/studentData';
import SearchBar from '@/components/SearchBar';
import { useSession } from 'next-auth/react'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Fade from 'react-reveal/Fade';

function student() {
    const { data: session, status } = useSession()
    const Login_ = () => {
        if (status === 'authenticated') {
            return <Chip
                avatar={<Avatar alt="Natacha" src={session.user.image} />}
                label={session.user.name}
                variant="outlined"
                id='avatar'
            />
        }
    }

    const scrollStyle = {
        height: '65px',
        width: '65px',
        borderRadius: '50%',
    }
    const [allStudentData, setAllStudentData] = useState([]);
    const [studentDataState, setstudentDatastate] = useState([]);

    useEffect(() => {
        fetch('/api/get_many')
            .then((response) => response.json())
            .then((data) => {
                setstudentDatastate(data.items);
                setAllStudentData(data.items);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Head>
                <title>NITH CSE</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <CustomCursor
                targets={['#home', '#about', '#faculty', '#student', '#moreDetails']}
                customClass='custom-cursor'
                dimensions={100}
                fill='skyblue'
                smoothness={{
                    movement: 0.3,
                    scale: 0.1,
                    opacity: 0.2,
                }}
                opacity={0.5}
                targetOpacity={0.5}
                targetScale={3}
                strokeColor={'#000'}
                strokeWidth={0}
            />
            <ScrollToTop smooth='true' width={30} height={30} style={scrollStyle} />
            <div className={styles.faculty}>
                <Navbar />
                <div className={styles.wideImage} style={{ height: '100vh' }}>
                    <Login_></Login_>
                    <Image
                        src="https://res.cloudinary.com/dz1vsgxm5/image/upload/v1716225367/nith-cse-website/vlusyosxr9ddv7mk8blb.jpg"
                        className="fullPagePics"
                        alt=""
                        sizes="100vw"
                        height="0"
                        width="0"
                    />
                    <div className={styles.overlay}></div>
                    <h1>Students</h1>
                    <p>The curiosity and tenacity that drives our faculty’s research and creativity make their classrooms exciting places to be.</p>
                </div>

                <div className={styles.dummyHeader}></div>

                <StudentGrid />

                <section className={styles.facultySection}>
                    <Fade left>
                        <div className={styles.heading}>
                            <h1>Our Students</h1>
                        </div>
                    </Fade>

                    <SearchBar allStudentData={allStudentData} studentData={studentDataState} setstudentData={setstudentDatastate} />

                    <div className={styles.cards}>
                        {studentDataState.map(user => {
                            return <UserCard key={user.key} user={user} />
                        })}
                    </div>
                </section>
            </div>
        </>
    )
}

export default student
