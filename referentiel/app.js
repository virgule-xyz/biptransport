// import React from 'react';
// import { AsyncStorage, Alert } from 'react-native';
// import { PictureContext, AcciMoto } from '@components';
// import RNFetchBlob from 'rn-fetch-blob';
// import axios from 'axios';
// import Navigator from './Navigator';

// /**
//  * L'application principale
//  */
// class App extends React.Component {
//   static makeSearch = ({ kind, partnumber, onSuccess, onError, searchOn, searchOff, country }) => {
//     if (searchOn) searchOn();

//     const theurl = `${AcciMoto.API.url}/get?key=${
//       AcciMoto.API.key
//     }&lang=${country}&type=${kind}&num=${partnumber}`;

//     try {
//       axios({
//         url: theurl,
//         method: 'GET',
//         timeout: 5000,
//         withCredentials: true,
//         maxContentLength: 4096,
//       })
//         .then(response => {
//           const { data, status } = response;
//           if (searchOff) searchOff();
//           if (data.result === 'KO' || status !== 200) {
//             if (onError) onError(data.text);
//           } else {
//             const { items } = data;
//             let ret = null;
//             if (kind === 'pie')
//               ret = {
//                 kind,
//                 partnumber,
//                 partdatas: {
//                   name: items.piece,
//                   trademark: items.marque,
//                   model: items.modele,
//                   type: items.type,
//                   periode: items.periode,
//                   couleur: items.couleur,
//                   cylindree: items.cylindree,
//                 },
//               };
//             if (kind === 'mot')
//               ret = {
//                 kind,
//                 partnumber,
//                 partdatas: {
//                   type: items.type,
//                   num: items.num,
//                   marque: items.marque,
//                   modele: items.modele,
//                   immat: items.immat,
//                   kms: items.kms,
//                   couleur: items.couleur,
//                 },
//               };
//             console.warn(ret);
//             if (onSuccess) onSuccess(ret);
//           }
//         })
//         .catch(error => {
//           console.warn(error);
//           if (searchOff) searchOff();
//           if (onError) onError(error);
//         });
//     } catch (e) {
//       console.warn(e);
//     }
//   };

//   toupload = [];

//   /**
//    * Le constructeur avec le state contenant les images
//    * @param {*} props
//    */
//   constructor(props) {
//     super(props);
//     this.state = {
//       kind: 'pie',
//       partnumber: 0,
//       partdatas: { name: '', trademark: '', model: '', type: '', line1: '', line2: '' },
//       motdatas: {
//         type: '',
//         num: '',
//         marque: '',
//         modele: '',
//         immat: '',
//         kms: '',
//         couleur: '',
//       },
//       pictures: [],
//       queue: [],
//       connected: true,
//       addPicture: this.addPicture,
//       removePicture: this.removePicture,
//       uploadPictures: this.uploadPictures,
//       selectNewItem: this.selectNewItem,
//     };
//   }

//   /**
//    * Nomme une pièce pour l'upload
//    */
//   setNameData = (kind, partnumber, index) => {
//     const sep = '_';
//     const partnumber05 = partnumber.padStart(5, '0');
//     const index02 = `${index + 1}`.padStart(2, '0');
//     const newname = kind + sep + partnumber05 + sep + index02;
//     return newname;
//   };

//   /**
//    * change de type de pièce (pie - pièce ou mot - moto) et de numéro
//    */
//   selectNewItem = ({ kind, partnumber, partdatas }) => {
//     const state = Object.assign({}, this.state);
//     state.kind = kind;
//     state.partnumber = partnumber;
//     if (kind === 'pie') state.partdatas = partdatas;
//     if (kind === 'mot') state.motdatas = partdatas;
//     console.warn(state);
//     this.setState(state);
//   };

//   /**
//    * Ajoute une image au state/array
//    */
//   addPicture = data => {
//     this.setState(state => ({
//       pictures: [...state.pictures, data.base64],
//     }));
//   };

//   /**
//    * supprime une image du tableau
//    */
//   removePicture = (index, pname) => {
//     this.setState(state => {
//       const newPictures = state.pictures.filter((item, id) => id + item !== index + pname);
//       return { pictures: newPictures };
//     });
//   };

//   /**
//    * lancement du background-runner au montage
//    */
//   componentDidMount = async () => {
//     const pictures = await this.unpersistPictures();
//     this.setState({
//       pictures: [],
//       queue: pictures,
//     });
//     this.backgroundRunner(pictures);
//   };

//   /**
//    * demande le chargement des images vers le serveur en remplissant la queue de chargement
//    */
//   uploadPictures = () => {
//     const me = this;
//     const newToUpload = me.state.pictures.map((item, index) => ({
//       file: item,
//       name: me.setNameData(me.state.kind, me.state.partnumber, index),
//     }));
//     if (me.state.queue && me.state.queue.length > 0) {
//       this.topupload = [...me.state.queue, ...newToUpload];
//     } else {
//       this.topupload = [...newToUpload];
//     }
//     this.setState({
//       pictures: [],
//       queue: this.topupload,
//     });
//     this.persistPictures(this.topupload).then(() => {
//       this.backgroundRunner(this.topupload);
//     });
//   };

//   /**
//    * Recover pictures from persistent storage
//    *
//    * @returns {Array} toutes les images
//    */
//   unpersistPictures = async () => {
//     const jspictures = await AsyncStorage.getItem('pictures');
//     return JSON.parse(jspictures);
//   };

//   /**
//    * Save all pictures to persistent storage
//    *
//    * @param {Array} pictures All pictures array to presist
//    */
//   persistPictures = pictures => AsyncStorage.setItem('pictures', JSON.stringify(pictures));

//   /**
//    * la tâche de fond pour charger les images, avec vérification de l'état du réseau
//    *
//    * @param {Array} pictures toutes les images
//    */
//   backgroundRunner = pictures => {
//     const putThisPictureOnServer = picture =>
//       new Promise((resolve, reject) => {
//         debugger;
//         RNFetchBlob.fetch(
//           'POST',
//           AcciMoto.URL.upload,
//           {
//             'Content-Type': 'multipart/form-data',
//           },
//           [
//             { name: 'key', data: AcciMoto.API.key },
//             { name: 'type', data: picture.name.substr(0, 3) },
//             { name: 'name', data: `${picture.name}.jpg` },
//             { name: 'file', data: picture.file },
//           ],
//         )
//           .then(d => {
//             console.warn('THEN', d);
//             resolve();
//           })
//           .catch(e => {
//             console.warn('CATCH', e);
//             reject();
//           });
//       });

//     const state = Object.assign({}, this.state);
//     state.queue = pictures;
//     this.setState(state);

//     if (pictures && pictures.length >= 1) {
//       const copyPictures = pictures.concat([]);
//       const toUpload = copyPictures.shift();
//       putThisPictureOnServer(toUpload)
//         .then(() => {
//           const state2 = Object.assign({}, this.state);
//           state2.queue = copyPictures;
//           this.setState(state2);
//           if (copyPictures.length > 0) {
//             this.persistPictures(copyPictures).then(() => {
//               this.backgroundRunner(copyPictures);
//             });
//           } else {
//             this.persistPictures([]);
//           }
//         })
//         .catch(() => {
//           Alert.alert("Erreur à l'upload");
//         });
//     }
//   };

//   /**
//    * le renderer contient le provider de contexte avec les images à gérer
//    */
//   render = () => (
//     <PictureContext.Provider value={this.state}>
//       <Navigator />
//     </PictureContext.Provider>
//   );
// }

// export default App;
