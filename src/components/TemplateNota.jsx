import { useUser } from '../context/Context.js'
import { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { getIndexStorage } from '../firebase/storage'
import styles from '../styles/Template.module.css'
import { useRouter,usePathname } from 'next/navigation'
import Link from 'next/link'
import Banner from '../components/Banner'


function TemplateSix({ color, topic, banner }) {

    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear } = useUser()
    const router = useRouter()
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const pathname = usePathname()


    const [elements, setElements] = useState(false)
    const [dataForDate, setDataForDate] = useState([])
    const [dataEditor, setDataEditor] = useState(null)

    function setPostsElements() {
        setElements(!elements)
    }

    function handlerClickEnlace(info) {
        pathname != "/Admin" && info.i !== undefined && router.push("/" + userDB[topic]["Posts"][`PostImage_${info.i}`])
        pathname == "/Admin" && setDataEditor(info)
    }

    useEffect(() => {
        userDB[topic] && userDB[topic]["Posts"] && setDataForDate(Object.keys(userDB[topic]["Posts"]).map(i => { const newI = i.split('_'); return newI[1] }).sort((a, b) => b - a))
    }, [userDB, postsIMG]);
    return (
        <section className={`${styles.section} bg-white pb-[0px] sm:pb-[10px]`} id={topic} style={{ backgroundColor: color }}>
            <div className={styles.containerSubtitle}><h4 className={styles.subtitle}> Relacionados</h4></div>

            {userDB[topic]["BannerTop"] && banner !== 'none' && <Banner ruta={topic} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}

            {topic != "Inicio" && <button className={styles.buttonSeeAll} onClick={setPostsElements}>Ver todo</button>
            }

            <div className={`${styles.gridEight} ${elements == true && styles.allVisible}`} style={{ backgroundColor: color }}>

                {userDB && dataForDate.length > 0 && dataForDate.map((i, index) =>

                    <>
                        {userDB[topic]["Posts"] && userDB[topic]["Posts"][`PostImage_${i}`] && userDB[topic]["Posts"][`PostImage_${i}`].state !== undefined && userDB[topic]["Posts"][`PostImage_${i}`].state === 'Publicado' && pathname !== "/Admin" &&

                            <div key={index} onClick={()=>router.push(userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] ? userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] : '')}>
                                {userDB[topic]["Posts"][`PostImage_${i}`]['content'] ? '' : <span className={styles.inDevelop}>{pathname !== "/Admin" && ''}</span>}
                                {pathname == "/Admin" && <span className={styles.datePost} onClick={() => handlerClickEnlace({ i, carpeta: 'Post' })}>{`${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getDate()}-${months[new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMonth()]} ${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getHours()}:${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMinutes()}`}</span>}

                                <Link href={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] ? userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] : ''} legacyBehavior>
                                    <a target={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] && userDB[topic]["Posts"][`PostImage_${i}`]['enlace'].includes('http') ? '_blanck' : ''}><img src={userDB[topic].Posts[`PostImage_${i}`].url} style={{ objectPosition: `${userDB[topic]["Posts"][`PostImage_${i}`]['objectFit']}` }} loading="lazy" /></a>
                                </Link>

                                {userDB[topic]["Posts"][`PostImage_${i}`]['description'] && <p className={styles.description}>{userDB[topic]["Posts"][`PostImage_${i}`]['description']}</p>}
                            </div>}

                        {
                            userDB[topic]["Posts"] && userDB[topic]["Posts"][`PostImage_${i}`] && pathname == "/Admin" &&
                            <div key={index} >
                                {userDB[topic]["Posts"][`PostImage_${i}`]['content'] ? '' : <span className={styles.inDevelop}>{pathname !== "/Admin" && ''}</span>}
                                {pathname == "/Admin" && <span className={styles.datePost} onClick={() => handlerClickEnlace({ i, carpeta: 'Post' })}>{`${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getDate()}-${months[new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMonth()]} ${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getHours()}:${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMinutes()}`}</span>}

                                <Link href={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] ? userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] : ''} legacyBehavior>
                                    <a target={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'] && userDB[topic]["Posts"][`PostImage_${i}`]['enlace'].includes('http') ? '_blanck' : ''}><img src={userDB[topic].Posts[`PostImage_${i}`].url} style={{ objectPosition: `${userDB[topic]["Posts"][`PostImage_${i}`]['objectFit']}` }} loading="lazy" /></a>
                                </Link>

                                {userDB[topic]["Posts"][`PostImage_${i}`]['description'] && <p className={styles.description}>{userDB[topic]["Posts"][`PostImage_${i}`]['description']}</p>}
                            </div>}
                    </ >
                )}
             

            </div>

            {userDB[topic]["BannerBottom"] && banner !== 'none' && <Banner ruta={topic} carpeta="BannerBottom" click={handlerClickEnlace} ></Banner>}
            {dataEditor && <Modal topic={topic} carpeta={dataEditor.carpeta} i={dataEditor.i} close={handlerClickEnlace} ></Modal>}
        </section>
    )
}
export default TemplateSix 
