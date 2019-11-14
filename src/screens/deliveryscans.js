import React, { useState, useEffect, useContext, useCallback } from 'react';
import { withNavigation } from 'react-navigation';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CIcon, CBarCodeReader, CSpace, CButton, CContent, CText, CTitle } from '@components';
import { AppContext } from '@contexts';
import { NAVS } from '@screens';

const STORAGE_KEY = 'BIP_TRANSPORT_TOUR';

const itContains = (what, whole) => whole.findIndex(elt => what === elt.code);

/**
 * Should display all the delivery packages code to scan before going in the course
 * The process is :
 * - Display the number of parcel to deliver, number coming from courses previously entered
 * - Display a barcode scanner that allow to scan a parcel barcode so that parcel is count as ok for the course or as an error
 * - - If an error then display the code in red
 * - Go to the next parcel barcode if anyone left
 * - If almost one parcel has not been scanned than the driver cannot go forward : if less than 10 parcel are to be scanned then displays their code
 * - - Remove the code scanned
 * - If all parcel are scanned, even with errors, then the driver can go forward
 */
const ScreenDeliveryScans = ({ navigation }) => {
  const MAX_ERRORS = 3;

  // manage the context
  const appContext = useContext(AppContext);
  const tourKey = appContext.slip.id;
  const [initialToScan, setInitialToScan] = useState(null);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [scanErrors, setScanErrors] = useState([]);
  const [showToScan, setShowToScan] = useState(false);
  // const [showScanner, setShowScanner] = useState(false);

  const [toScan, setToScan] = useState(null);

  // change views in the UI based on states
  useEffect(() => {
    const runIt = collection => {
      const count = collection.length;
      AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ tourId: tourKey, whatToScan: collection }),
      );
      setShowToScan((count > 0 && count <= 5) || scanErrors.length >= MAX_ERRORS);
      if (initialToScan)
        setCanGoForward(initialToScan.length > 0 && count <= 0);
    };
    if (toScan !== null) runIt(toScan);
  }, [toScan]);

  /**
   * search for the tourkey in the localstorage. if it exist then it contains the remaining of scans to do if
   * it was aborted on a previous session
   */
  useEffect(() => {
    const runIt = t => {
      if (appContext.needPreScan) {
        AsyncStorage.getItem(STORAGE_KEY, false)
          .then(async value => {
            setInitialToScan(appContext.getAllShippingCodes());
            const { tourId, whatToScan } = JSON.parse(value);
            if (tourId === t && whatToScan.length > 0) {
              setToScan(whatToScan);
            } else {
              setToScan(appContext.getAllShippingCodes());
            }
          })
          .catch(async () => {
            setToScan(appContext.getAllShippingCodes());
          });
      } else {
        setAlreadyDone(true);
        navigation.navigate(NAVS.deliveryscans.next);
      }
    };

    runIt(tourKey);
  }, [tourKey]);

  // change views in the UI based on states
  useEffect(() => {
    const runIt = done => {
      if (done) {
        setCanGoForward(true);
      }
    };

    runIt(alreadyDone);
  }, [alreadyDone]);

  useEffect(() => {
    if (canGoForward) {
      navigation.navigate(NAVS.deliveryscans.next);
    }
  }, [canGoForward]);

  useEffect(() => {
    if (scanErrors.length >= MAX_ERRORS) {
      setShowToScan(true);
    }
  }, [scanErrors]);

  // speed return to home
  const onPressBackHome = () => {
    navigation.navigate(NAVS.deliveryscans.previous);
  };

  // go to next screen
  const doGoForward = () => {
    navigation.navigate(NAVS.deliveryscans.next);
  };

  // Bar Code management
  const onBarCodeSuccess = () => {
    // setToScan(state => state.filter(elt => elt !== value));
  };

  const onBarCodeError = () => {
    // setScanErrors(state => [...state, value]);
  };

  const onBarCodeVerificator = code => {
    return new Promise(resolve => {
      if (itContains(code, toScan) >= 0) {
        setToScan(state => {
          const filtered = state.filter(elt => {
            return elt.code !== code;
          });
          return filtered;
        });
        resolve(code);
      } else if (itContains(code, initialToScan) >= 0) {
        setScanErrors(state => [...state, `${code} déjà scanné`]);
        resolve(code);
      } else {
        setScanErrors(state => [...state, `${code} inconnu`]);
        resolve(code);
      }
    });
  };

  /**
   *
   * @param {object} what - {code,waypoint}
   */
  const ShowWhatToScan = ({ what }) => {
    return (
      <CText style={{ fontWeight: 'bold' }}>
        {`Colis ${what.code}
de ${what.waypoint.labo}
pour ${what.waypoint.name}

`}
      </CText>
    );
  };

  return (
    <CContent
      title="Vérifications des colis"
      fullscreen
      top
      stretch
      pressBackHome={onPressBackHome}
    >
      {(!canGoForward && (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              backgroundColor: '#f4f4f4',
            }}
          >
            <CText
              style={{
                fontSize: 80,
                fontWeight: 'bold',
                lineHeight: 80,
                margin: 0,
                marginTop: 10,
              }}
            >
              {toScan ? toScan.length : 0}
            </CText>
            <CText style={{ fontSize: 12, lineHeight: 12, margin: 0, marginBottom: 10 }}>
              colis à scanner
            </CText>
          </View>
          <CBarCodeReader
            verificator={onBarCodeVerificator}
            onSuccess={onBarCodeSuccess}
            onError={onBarCodeError}
          />
          <CSpace />
          {showToScan && (
            <View
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'orange',
                borderRadius: 2,
              }}
            >
              <CTitle>Reste à scanner...</CTitle>

              {toScan ? toScan.map(item => <ShowWhatToScan what={item} />) : null}
            </View>
          )}
          {scanErrors.length > 0 && (
            <View
              style={{
                backgroundColor: 'red',
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 2,
              }}
            >
              <CTitle style={{ color: 'white' }}>
                {`${scanErrors.length} erreur${scanErrors.length > 1 ? 's' : ''}`}
              </CTitle>
              {scanErrors.map(item => (
                <CText style={{ color: 'white' }}>{item}</CText>
              ))}
            </View>
          )}
          <CSpace />
        </>
      )) || (
        <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'green',
            }}
          >
            <CIcon name="check" size={44} />
            <CSpace />
            <CText uppercase style={{ color: 'white' }}>
              Tous les colis ont été scanné...
            </CText>
          </View>
          <CSpace />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              width: '100%',
              backgroundColor: 'red',
            }}
          >
            <CButton full label="Commencer la tournée" onPress={doGoForward} />
          </View>
        </>
      )}
    </CContent>
  );
};

export default withNavigation(ScreenDeliveryScans);
