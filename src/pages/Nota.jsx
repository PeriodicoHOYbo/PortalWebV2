import Head from 'next/head'
import { WithoutAuth } from '../../HOCs/WithoutAuth'


export async function getServerSideProps(context) {
    return {
      props: {
        dataServer: { "title": "true" },
      },
    };
  }
  
  const Nota = ({ dataServer }) => {


    console.log(dataServer)
    return (<>
      <Head>
          <title>{dataServer.title}</title>
          <meta name="description" content="Esta es una descripción increíble de mi página." />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={`Hoy Bolivia: `} />
          <meta property="og:description" content="Esta es una descripción increíble de mi página." />
          <meta property="og:image" content="/gobierno.jpg" />
          <meta property="og:url" content="/gobierno.jpg" />
          <meta property="og:type" content="website" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Bienvenido a Mi Página" />
          <meta name="twitter:description" content="/gobierno.jpg" />
          <meta name="twitter:image" content="/gobierno.jpg" />
        </Head>
       <div className="bg-white">
        <h1>Server-Side Data</h1>
        <pre>{JSON.stringify(dataServer, null, 2)}</pre>
      </div>
    </>
   
    );
  };
  export default Nota

  














//   router.query && router.query.temporal && userDB[validate()] && userDB[validate()].Posts && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url !== undefined &&

//   <Layout>

//   {specificData && router.query.temporal !== undefined &&
//     <main className={styles.main}>
//       <NavbarSimple footer={false}></NavbarSimple>

//       <div className={styles.containerBanner}>
//         {userDB && userDB[validate()] && userDB[validate()]["BannerTop"] && <Banner ruta={validate()} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}
//       </div>

//       <div className={`${styles.viewer} ${formViewer == false && styles.hideForm}`}>

//         <h2 className={styles.title}>{description}</h2>
//         <p className={styles.description}>{title}</p>

//         <div className={`${styles.containerButtonsPlayer} flex w-full justify-center`}>
//           {specificData && router.query && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota && <SpeechSynthesis text={parse(textEditor) !== 'En redacción ' && Array.isArray(parse(textEditor)) && parse(textEditor).reduce((acc, result) => {
//             return acc + result.props.children
//           }, '').replaceAll('[object Object]').replaceAll('undefined')} />}
//         </div>

//         <div className={styles.containerIMGCenter}>
//           <div className={styles.containerIMG}>
//             <img src={userDB[validate()] && userDB[validate()].Posts && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url !== undefined && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url} className={styles.image} alt="" />
//             <span className={styles.copyrightIMG}>{copyrightIMG}</span>
//           </div>
//         </div>



//         {userDB && userDB[validate()] && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].state == 'Publicado' || user
//           ? <div className={`${styles.qlEditor} `} styles={{ padding: '0', height: '50%' }} >
//             <div className={`${styles.editor} ${styles.editorNon}`}>
//               <TextEditor setValue={handlerTextEditorOnChange} value={textEditor ? textEditor : 'nada'} edit={false}></TextEditor>
//             </div>

//             <br />

//             <div className={styles.redactorData}>
//               <div className={styles.perfil}>
//                 <img src={userDB[validate()] && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor !== undefined && userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor].url} className={styles.perfilIMG} alt="" />
//                 {userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor] && <p>{userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor].name} <br /> Redactor</p>}
//               </div>
//               <span>
//                 {days[new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getDay()]} {' de '}
//                 {new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getDate()} {' de '}
//                 {months[new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getMonth()]} {' de '}
//                 {new Date(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].fecha).getFullYear()}</span>
//             </div>
//           </div>


//           : <div>En redacción...</div>

//         }
//         {user && formViewer == true && <div className='w-[90%] max-w-[350px] relative left-0 right-0 bottom-[20px] mx-auto z--50'>
//           <Button style="miniButtonPrimary" click={formViewerHandler}>Editar nota</Button>
//         </div>}
//       </div>

//       <div className={styles.adds}>



//         <BannerNotas routeDB={`${validate()}`} items={[1, 2, 3, 4]} click={handlerClickEnlace} admin={formViewer}></BannerNotas>

//         {/* <img src="/publicidad.jpg" alt="" /> */}
//       </div>



//       {/* editor */}


//       {user && <div className={`${styles.viewer} ${formViewer == true && styles.hideForm}`}>
//         <div className='flex w-full'>
//           <label htmlFor="Title" className='w-[100px]' >Titulo</label>
//           <input type="text" id="Title" name="description" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={description} />

//         </div>
//         <br />
//         <div className='flex w-full'>
//           <label htmlFor="Description" className='w-[100px]' >Descripcion</label>
//           <input type="text" id="Description" name="title" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={title} />

//         </div>
//         <br />
//         <div className='flex w-full'>
//           <label htmlFor="Description" className='w-[100px]' >Autor IMG</label>
//           <input type="text" id="Description" name="copyrightIMG" className='block w-full p-1 rounded-[5px] mx-[5px] outline-none border-[1px] border-gray-500' onChange={handlerOnChange} defaultValue={copyrightIMG} />
//         </div>


//         <h2 className={styles.title}>{description}</h2>
//         <p className={styles.description}>{title}</p>

//         <div className={styles.containerIMGCenter}>
//           <div className={styles.containerIMG}>
//             <img src={userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].url} className={styles.image} alt="" />
//             <span className={styles.copyrightIMG}>{copyrightIMG}</span>
//           </div>
//         </div>
//         <SpeechToText setValue={setTextEditor} value={textEditor ? textEditor : 'nada'} />
//         <br />
//         <div className={styles.editor}  >
//           <TextEditor setValue={setTextEditor} value={textEditor ? textEditor : 'nada'} edit={true}></TextEditor>
//         </div>

//         <br />

//         <input type="checkbox" onClick={handlerChecked} checked={isChecked} /> init
//         <br />
//         <br />


//         <div className={styles.buttonsContainer}>
//           <Button style="miniButtonPrimary" click={(e) => save(e, 'B')}> Guardar/Borrador</Button>
//           <Button style="miniButtonPrimary" click={(e) => save(e, 'P')}> Publicar</Button>
//         </div>
//         {user && formViewer == false && <div className='w-[90%] max-w-[350px] relative left-0 right-0  mx-auto py-5'>
//           <Button style="miniButtonPrimary" click={formViewerHandler}>Previsualizar</Button>
//         </div>}
//       </div>}

//     </main>}
//   {specificData && router.query.temporal !== undefined &&
//     <TemplateNota topic={validate()} publicView={true} banner='none'></TemplateNota>
//   }

//   {dataEditor && <Modal carpeta={dataEditor.carpeta} item={dataEditor.item} i={dataEditor.i} close={handlerClickEnlace}></Modal>}

//   {success == "save" && <Success>Cargando...</Success>}

//   {user === null && <Temporizador topic={validate()} />}
// </Layout>