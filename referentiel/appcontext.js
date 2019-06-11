import React, { Component } from "react";
import qs from "qs";
import axios from "axios";

const userDefaultState = {
  login: "",
  password: "",
  name: "",
  id: null
};
const uploadsDefaultState = {
  count: 0,
  files: []
};
const projectDefaultState = {
  client: "",
  crtdt: 0,
  crtus: "",
  date: "",
  etape: 0,
  gamme: "",
  id: 0,
  mode: "ESS",
  numero: 0,
  partenaire: "",
  picture: null,
  reference: "",
  retour: "",
  travaux: []
};

const defaultApplicationState = {
  user: userDefaultState,
  uploads: uploadsDefaultState,
  project: projectDefaultState,
  testLogin: () => {},
  getUser: () => {},
  setUser: () => {},
  searchProjectByCode: () => {},
  setProject: () => {},
  logout: () => {},
  changeProject: () => {},
  setCurrentPicture: () => {},
  cancelCurrentPicture: () => {},
  saveCurrentPicture: () => {},
  startSendingPictureToServer: () => {},
  stopSendingPictureToServer: () => {}
};

const ApplicationContext = React.createContext(defaultApplicationState);

class ApplicationContextProvider extends Component {
  static API = {
    BASE_URL: "https://www.logidents.com/api/",
    LOGIN_URL: "token.php",
    GET_URL: "bon/get.php",
    PICTURES_URL: "bon/upload.php",
    KEY: "YkcL9zN9CDtwsBJjGn136zDdtgZzpLeYpxtoTf679hKvOEGiXXwYwiZIVHoJyoak"
  };

  constructor(props) {
    super(props);
    this.state = {
      user: userDefaultState,
      uploads: uploadsDefaultState,
      project: projectDefaultState
    };
  }

  axiosParams = (url, body, params = null) => {
    const baseParams = {
      baseURL: ApplicationContextProvider.API.BASE_URL,
      url: `${url}?key=${ApplicationContextProvider.API.KEY}&${body}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      timeout: 30000,
      responseType: "json"
    };
    return { ...baseParams, ...params };
  };

  testLogin = (login, password) => {
    const params = this.axiosParams(
      ApplicationContextProvider.API.LOGIN_URL,
      `login=${login}&password=${password}`
    );

    return new Promise((resolve, reject) => {
      axios(params)
        .then(({ data, status }) => {
          if (status === 200 && data.error > 0) {
            reject({ idCorrect: false, pwdCorrect: false, error: data.error });
          } else {
            this.setState(
              {
                user: {
                  token: data.token,
                  login: login,
                  password: password,
                  name: login,
                  id: login
                }
              },
              () => {
                resolve({ idCorrect: true, pwdCorrect: true, error: "" });
              }
            );
          }
        })
        .catch(error => {
          console.warn("ERROR", error);
          reject({ idCorrect: false, pwdCorrect: false, error: error });
        });
    });
  };

  getUser = () => {
    return this.state.user;
  };

  setUser = () => {};

  searchProjectByCode = (projectId, source = "cab") => {
    const params = this.axiosParams(
      ApplicationContextProvider.API.GET_URL,
      `token=${this.state.user.token}&${source}=${projectId}`
    );

    return new Promise((resolve, reject) => {
      axios(params)
        .then(({ data, status }) => {
          if (status === 200 && data.error > 0) {
            reject({ error: data.error, msg: data.errorText });
          } else {
            resolve(data);
          }
        })
        .catch(error => {
          reject({ msg: error });
        });
    });
  };

  setProject = project => {
    this.setState({
      project: project
    });
  };

  logout = () => {
    this.setState({
      user: userDefaultState,
      uploads: uploadsDefaultState,
      project: projectDefaultState
    });
  };

  changeProject = () => {
    this.setState({
      project: projectDefaultState
    });
  };

  cancelCurrentPicture = () => {
    this.setState(state => ({
      project: {
        ...state.project,
        picture: null
      }
    }));
  };

  saveCurrentPicture = () => {
    return new Promise((resolve, reject) => {
      this.setState(
        state => {
          const { count, files } = state.uploads;
          const newCount = count + 1;
          const newFiles = [...files, state.project];
          return {
            uploads: {
              count: newCount,
              files: newFiles
            }
          };
        },
        () => {
          this.startSendingPictureToServer();
          resolve();
        }
      );
    });
  };

  setCurrentPicture = source => {
    this.setState(state => ({
      project: {
        ...state.project,
        picture: source
      }
    }));
  };

  /*
const putThisPictureOnServer = picture =>
      new Promise((resolve, reject) => {
        RNFetchBlob.fetch(
          'POST',
          AcciMoto.URL.upload,
          {
            'Content-Type': 'multipart/form-data',
          },
          [
            { name: 'key', data: AcciMoto.API.key },
            { name: 'type', data: picture.name.substr(0, 3) },
            { name: 'name', data: `${picture.name}.jpg` },
            { name: 'file', data: picture.file },
          ],
        )
          .then(d => {
            console.warn('THEN', d);
            resolve();
          })
          .catch(e => {
            console.warn('CATCH', e);
            reject();
          });
      });
*/

  sendPictureToServer = elt => {
    const { id, picture } = elt;
    const base64 = "data:image/jpeg;base64,";
    var image64 = picture.uri.substr(base64.length);
    console.warn(image64);
    const params = {
      baseURL: ApplicationContextProvider.API.BASE_URL,
      url:
        ApplicationContextProvider.API.PICTURES_URL +
        "?token=" +
        this.state.user.token,
      method: "POST",
      data: qs.stringify({ id: id, file: image64 }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      timeout: 30000,
      responseType: "json"
    };

    return new Promise((resolve, reject) => {
      axios(params)
        .then(({ data, status }) => {
          if (status === 200 && data.error > 0) {
            reject({ error: data.error, msg: data.errorText });
          } else {
            resolve();
          }
        })
        .catch(error => {
          reject({ msg: error });
        });
    });
  };

  startSendingPictureToServer = async () => {
    const { files } = this.state.uploads;
    if (files.length > 0) {
      try {
        await this.sendPictureToServer(files[0]);
        await this.removePicture(files[0]);
        await this.startSendingPictureToServer();
      } catch (e) {
        this.stopSendingPictureToServer();
      }
    } else await this.stopSendingPictureToServer();
  };

  removePicture = elt => {
    return new Promise(resolve => {
      if (this.state.uploads.count > 0) {
        const uploads = this.state.uploads.files.filter(
          file => file.id !== elt.id
        );
        this.setState(
          {
            uploads: {
              count: uploads.length,
              files: uploads
            }
          },
          () => {
            resolve();
          }
        );
      } else {
        resolve();
      }
    });
  };

  stopSendingPictureToServer = () => {};

  render() {
    const { children } = this.props;
    const { user, uploads, project } = this.state;

    return (
      <ApplicationContext.Provider
        value={{
          user,
          uploads,
          project,
          testLogin: this.testLogin,
          getUser: this.getUser,
          setUser: this.setUser,
          searchProjectByCode: this.searchProjectByCode,
          setProject: this.setProject,
          logout: this.logout,
          changeProject: this.changeProject,
          cancelCurrentPicture: this.cancelCurrentPicture,
          saveCurrentPicture: this.saveCurrentPicture,
          setCurrentPicture: this.setCurrentPicture,
          startSendingPictureToServer: this.startSendingPictureToServer,
          stopSendingPictureToServer: this.stopSendingPictureToServer
        }}
      >
        {children}
      </ApplicationContext.Provider>
    );
  }
}

export default ApplicationContext;
export { defaultApplicationState, ApplicationContextProvider };
