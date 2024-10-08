import { initializeApp } from 'firebase/app';
import { app } from './config'
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set, update, child, get, query, remove, startAfter, limitToFirst, limitToLast, orderByValue, startAt, orderByChild, endAt, endBefore } from "firebase/database";
import { getList, getIndexStorage } from './storage'
import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'


const auth = getAuth();
const db = getDatabase(app);

function onAuth(setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, setUserMonthAndYear, setUserDayMonthYear, monthAndYear) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserProfile(user)
    } else {
      setUserProfile(user)

      get(query(ref(db, 'login')))
        .then((snapshot) => {
          if (snapshot.exists()) {
            let snap = snapshot.val()
            // setUserData(allData)
            allData = { ...allData, login: snap }
            setUserData(allData)
          }
        });



    }

    getMonthAndYear(setUserMonthAndYear)
    getDayMonthYear(setUserDayMonthYear)
  });
}

// ---------------------------Login, Sign Up and Sign In------------------------------------

function signUpWithEmail(email, password, setUserSuccess) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setUserSuccess('SignUpError')
      // ..
    });
}

function signInWithEmail(email, password, setUserSuccess) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setUserSuccess('Verify')
    });
}

function handleSignOut() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

// -------------------------------Firebase Realtime Database------------------------------------

const dbRef = ref(getDatabase());

let allData = {}


async function getIndexData(setUserData, date, minDate, setUserSuccess) {
  let arr = ['Inicio', 'Sociedad', 'Salud', 'Seguridad', 'Politica', 'Economia', 'Deportes', 'GestionDeGobierno', 'Cultura', 'Empresarial', 'Internacional']
  let arr2 = ['BannerIzquierdo1', 'BannerIzquierdo2', 'BannerIzquierdo3', 'BannerIzquierdo4', 'BannerPortada1', 'BannerPortada2', 'BannerPortada3', 'BannerDerecho1', 'BannerDerecho2', 'BannerDerecho3', 'BannerDerecho4', 'BannerPortada']
  let arr3 = ['BannerNotas1', 'BannerNotas2', 'BannerNotas3', 'BannerNotas4']


             


  get(query(ref(db, 'login')))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let snap = snapshot.val()
        // setUserData(allData)
        allData = { ...allData, login: snap }
        setUserData(allData)
      }
    });


          

  get(query(ref(db, 'users')))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let snap = snapshot.val()
        // setUserData(allData)
        allData = { ...allData, users: snap }
      }

    });
    get(query(ref(db, 'EdicionDigital')))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let snap = snapshot.val()
        // setUserData(allData)
        allData = { ...allData, EdicionDigital: snap }
      }

    });

  let  nowaday = new Date().getTime()

  arr2.map((i) => {
    // get(query(ref(db, i),  orderByChild('dateInit'), endBefore(date.toString())))
    get(query(ref(db, i), limitToLast(10), orderByChild('dateFinish'), startAt(minDate? minDate: nowaday),))

      .then((snapshot) => {
        if (snapshot.exists()) {
          let snap = snapshot.val()
          allData = { ...allData, [i]: snap }
          setUserData(allData)
        }
      });       
  });


  arr3.map((i) => {
    get(query(ref(db, i)))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let snap = snapshot.val()
          // setUserData(allData)
          allData = { ...allData, [i]: snap }
        }

      });
  });


  arr.map((i) => {
    // get(query(ref(db, `${i}/Posts`), limitToLast(10), orderByChild('fecha'), ))

    console.log(parseInt(date))
    // get(query(ref(db, `${i}/Posts`), limitToLast(10), orderByChild('fecha'), startAt(minDate), endAt(date)))

     get(query(ref(db, `${i}/Posts`), limitToLast(20), orderByChild('fecha'), startAt(minDate), endAt(date)))
    .then(async (snapshot) => {

        if (snapshot.exists()) {
          let snap = snapshot.val()
          allData = {
            ...allData, [i]: {
              ...allData[i],
              Posts: snap,
            }

          }
        }
        setUserData(allData)
      })
  });

  arr.map((i) => {
    get(query(ref(db, `${i}/Templates`)))
      .then(async (snapshot) => {

        if (snapshot.exists()) {
          let snapTempVal = snapshot.val()

          allData = {
            ...allData, [i]: {
              ...allData[i],
              Templates: snapTempVal
            }

          }
        } else {

          allData = {
            ...allData, [i]: {
              ...allData[i],
              Templates: 'TemplateThreeB'
            }

          }
        }

        setUserData(allData)
      })
  });


  arr.map((i) => {
    get(query(ref(db, `${i}/BannerTop`)))
      .then(async (snapshot) => {

        if (snapshot.exists()) {
          let snapTempVal = snapshot.val()

          allData = {
            ...allData, [i]: {
              ...allData[i],
              BannerTop: snapTempVal
            }

          }
          setUserData(allData)
        }
      })
  });

  arr.map((i) => {
    get(query(ref(db, `${i}/BannerBottom`)))
      .then(async (snapshot) => {

        if (snapshot.exists()) {
          let snapTempVal = snapshot.val()

          allData = {
            ...allData, [i]: {
              ...allData[i],
              BannerBottom: snapTempVal
            }

          }
          setUserData(allData)
        }
      })
  })    ;

  arr.map((i) => {
    get(query(ref(db, `${i}/Modals`)))
      .then(async (snapshot) => {

        if (snapshot.exists()) {
          let snapTempVal = snapshot.val()

          allData = {
            ...allData, [i]: {
              ...allData[i],
              Modals: snapTempVal
            }

          }
          setUserData(allData)
        }
      })
  })    ;
  arr.map((i) => {
    get(query(ref(db, `${i}/BannerNotas1`)))
      .then(async (snapshot) => {

        if (snapshot.exists()) {
          let snapTempVal = snapshot.val()

          allData = {
            ...allData, [i]: {
              ...allData[i],
              BannerNotas1: snapTempVal
            }
          }
          setUserData(allData)
        }
      })
  });
  arr.map((i) => {
    get(query(ref(db, `${i}/BannerNotas2`)))
      .then(async (snapshot) => {

        if (snapshot.exists()) {
          let snapTempVal = snapshot.val()

          allData = {
            ...allData, [i]: {
              ...allData[i],
              BannerNotas2: snapTempVal
            }
          }
          setUserData(allData)
        }
      })
  });
  arr.map((i) => {
    get(query(ref(db, `${i}/BannerNotas3`)))
      .then(async (snapshot) => {

        if (snapshot.exists()) {
          let snapTempVal = snapshot.val()

          allData = {
            ...allData, [i]: {
              ...allData[i],
              BannerNotas3: snapTempVal
            }
          }
          setUserData(allData)
        }
      })
  });
  arr.map((i) => {
    get(query(ref(db, `${i}/BannerNotas4`)))
      .then(async (snapshot) => {

        if (snapshot.exists()) {
          let snapTempVal = snapshot.val()

          allData = {
            ...allData, [i]: {
              ...allData[i],
              BannerNotas4: snapTempVal
            }
          }
          setUserData(allData)
        }
      })
  });


}



function getSpecificData(rute, specificData, setUserSpecificData) {

  let key = rute.split('/').pop()
  get(child(dbRef, `${rute}`)).then((snapshot) => {
    if (snapshot.exists()) {
      let snap = snapshot.val()
      setUserSpecificData({ ...specificData, [key]: snap })
    } else {
      setUserSpecificData({ ...specificData, [key]: { nota: 'en redaccion' } })
    }
  }).catch((error) => {
    console.error(error);
  });
}

function writeUserData(ruteDB, object, setUserSuccess, detail) {
  console.log(object)
  console.log(ruteDB)
  update(ref(db, `${ruteDB}`), object)
    .then(() => {
      setUserSuccess ? setUserSuccess('save') : ''
      // getIndexData(setUserData,)
      console.log('save')
    })
    .catch((err) => console.log(err))
}

function removeData(ruteDB, setUserData, setUserSuccess) {
  remove(ref(db, ruteDB))
    .then(() => {
      getIndexData(setUserData)
      setUserSuccess('save')
    })
    .catch((err) =>{ 
      console.log(err)
      setUserSuccess('repeat')
    });
}
export { app, onAuth, signUpWithEmail, signInWithEmail, handleSignOut, getIndexData, getSpecificData, writeUserData, removeData, }



